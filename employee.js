(() => {
  "use strict";
  const Store = window.EarphoneBdStoreData;
  const Locations = window.BangladeshLocations;
  const $ = (id) => document.getElementById(id);
  const tabs = $("employeeTabs");
  const applicationForm = $("employeeApplicationForm");
  const applicationMessage = $("applicationMessage");
  const applicationResult = $("applicationResult");
  const statusForm = $("applicationStatusForm");
  const statusMessage = $("statusMessage");
  const statusResult = $("statusResult");
  const loginForm = $("employeeLoginForm");
  const loginMessage = $("loginMessage");
  const district = $("applicationDistrict");
  const upazila = $("applicationUpazila");
  const SESSION_KEY = "earphoneBdEmployeeSession";

  function escapeHTML(value){return String(value ?? "").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);}
  function normalizePhone(value){return String(value||"").replace(/\D/g,"");}
  function validPhone(value){return /^01[3-9]\d{8}$/.test(normalizePhone(value));}
  function switchTab(name){
    document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
    document.querySelectorAll("[data-panel]").forEach(p=>p.classList.toggle("active",p.dataset.panel===name));
    history.replaceState(null,"",`${location.pathname}?view=${name}`);
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function populateLocations(){
    if(!Locations)return;
    district.innerHTML='<option value="">জেলা নির্বাচন করুন</option>'+Locations.districts.map(d=>`<option>${escapeHTML(d)}</option>`).join("");
    district.addEventListener("change",()=>{
      const rows=Locations.upazilasFor(district.value);
      upazila.disabled=!rows.length;
      upazila.innerHTML=rows.length?'<option value="">উপজেলা নির্বাচন করুন</option>'+rows.map(v=>`<option>${escapeHTML(v)}</option>`).join(""):'<option value="">আগে জেলা নির্বাচন করুন</option>';
    });
  }
  function makeApplicationId(){return `APP-${Date.now().toString().slice(-8)}`;}
  function submitApplication(event){
    event.preventDefault();
    applicationMessage.textContent=""; applicationMessage.className="message full";
    const data=Object.fromEntries(new FormData(applicationForm).entries());
    data.phone=normalizePhone(data.phone); data.whatsapp=normalizePhone(data.whatsapp)||data.phone;
    if(!validPhone(data.phone)){applicationMessage.textContent="সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।";applicationMessage.classList.add("error");return;}
    const applications=Store.getEmployeeApplications();
    const employees=Store.getEmployees();
    const duplicate=applications.some(a=>a.phone===data.phone && !["Rejected","Withdrawn"].includes(a.status))||employees.some(e=>e.phone===data.phone && e.active!==false);
    if(duplicate){applicationMessage.textContent="এই মোবাইল নম্বর দিয়ে ইতোমধ্যে আবেদন বা Employee account আছে।";applicationMessage.classList.add("error");return;}
    const now=new Date().toISOString();
    const application={id:makeApplicationId(),...data,status:"Pending",submittedAt:now,updatedAt:now,adminNote:"",assignedRole:"",employeeId:""};
    applications.push(application); Store.saveEmployeeApplications(applications); applicationForm.reset(); upazila.disabled=true; upazila.innerHTML='<option value="">আগে জেলা নির্বাচন করুন</option>';
    applicationMessage.textContent="আবেদন সফলভাবে জমা হয়েছে।"; applicationMessage.classList.add("success");
    applicationResult.classList.remove("hidden");
    applicationResult.innerHTML=`<strong>Application ID: ${escapeHTML(application.id)}</strong><p>এই ID ও আপনার মোবাইল নম্বর সংরক্ষণ করুন। Admin review-এর পর status এখানে দেখতে পারবেন।</p><span class="status-pill">অপেক্ষমাণ</span>`;
    localStorage.setItem("earphoneBdLastApplication",JSON.stringify({id:application.id,phone:application.phone}));
  }
  function checkStatus(event){
    event.preventDefault(); statusMessage.textContent="";
    const data=Object.fromEntries(new FormData(statusForm).entries());
    const app=Store.getEmployeeApplications().find(a=>a.id.toUpperCase()===String(data.applicationId||"").trim().toUpperCase() && a.phone===normalizePhone(data.phone));
    if(!app){statusResult.classList.add("hidden");statusMessage.textContent="Application ID বা মোবাইল নম্বর মিলেনি।";statusMessage.className="message error full";return;}
    const cls=app.status==="Approved"?"approved":app.status==="Rejected"?"rejected":"";
    const label=app.status==="Approved"?"অনুমোদিত":app.status==="Rejected"?"বাতিল":"Admin review চলছে";
    statusResult.classList.remove("hidden");
    statusResult.innerHTML=`<strong>${escapeHTML(app.name)}</strong><p>আবেদন: ${escapeHTML(app.id)}<br>পছন্দের কাজ: ${escapeHTML(Store.roleLabel(app.preferredRole))}${app.assignedRole?`<br>নির্ধারিত role: ${escapeHTML(Store.roleLabel(app.assignedRole))}`:""}</p><span class="status-pill ${cls}">${label}</span>${app.status==="Approved"?'<p>আপনার Employee ID ও password Admin থেকে সংগ্রহ করে Employee Login ব্যবহার করুন।</p>':app.adminNote?`<p>Admin note: ${escapeHTML(app.adminNote)}</p>`:""}`;
  }
  function login(event){
    event.preventDefault(); loginMessage.textContent="";
    const data=Object.fromEntries(new FormData(loginForm).entries());
    const id=String(data.employeeId||"").trim().toUpperCase();
    const employee=Store.getEmployees().find(e=>String(e.id).toUpperCase()===id);
    if(!employee || employee.password!==String(data.password||"")){loginMessage.textContent="Employee ID বা password সঠিক নয়।";return;}
    if(employee.status!=="Approved" || employee.active===false){loginMessage.textContent="এই Employee account এখন সক্রিয় নয়। Admin-এর সঙ্গে যোগাযোগ করুন।";return;}
    const session={employeeId:employee.id,role:employee.role,name:employee.name,loginAt:new Date().toISOString()};
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));
    if(employee.role==="admin")sessionStorage.setItem("earphoneBdAdminSession","active");
    if(employee.role==="accounts")sessionStorage.setItem("earphoneBdPayoutEmployee",employee.id);
    location.href=Store.employeeRoute(employee.role);
  }
  function prefillLast(){
    try{const last=JSON.parse(localStorage.getItem("earphoneBdLastApplication"));if(last){statusForm.elements.applicationId.value=last.id||"";statusForm.elements.phone.value=last.phone||"";}}catch{}
  }
  tabs.addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)switchTab(b.dataset.tab);});
  applicationForm.addEventListener("submit",submitApplication); statusForm.addEventListener("submit",checkStatus); loginForm.addEventListener("submit",login);
  populateLocations(); prefillLast();
  const params=new URLSearchParams(location.search);
  const requested=params.get("view") || (params.has("login") ? "login" : "apply");
  switchTab(["apply","status","login"].includes(requested)?requested:"apply");
})();
