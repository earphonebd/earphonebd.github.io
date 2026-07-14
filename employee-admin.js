(() => {
  "use strict";
  const Store = window.EarphoneBdStoreData;
  if (!Store?.getEmployees) return;
  const $ = (id) => document.getElementById(id);
  const roleOptions = [
    ["affiliate","অ্যাফিলিয়েট"],["moderator","মডারেটর"],["support","কাস্টমার সাপোর্ট"],
    ["order_manager","অর্ডার ম্যানেজার"],["accounts","অ্যাকাউন্টস / পেআউট"],["admin","অ্যাডমিন"]
  ];
  let applicationQuery = "";
  let applicationStatus = "all";
  let employeeQuery = "";
  let activeApplicationId = "";

  function esc(value){return String(value??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);}
  function date(value){try{return new Intl.DateTimeFormat("bn-BD",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(value));}catch{return "";}}
  function roleLabel(role){return Store.roleLabel(role);}
  function statusClass(status){return String(status||"").toLowerCase().replace(/\s+/g,"-");}
  function randomPassword(){const alphabet="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#";return Array.from({length:9},()=>alphabet[Math.floor(Math.random()*alphabet.length)]).join("");}
  function rolePrefix(role){return ({affiliate:"AF",moderator:"MD",admin:"AD",accounts:"AC",support:"SP",order_manager:"OM"})[role]||"EM";}
  function nextEmployeeId(role){
    const prefix=`EBD-${rolePrefix(role)}-`;
    const nums=Store.getEmployees().filter(e=>String(e.id).startsWith(prefix)).map(e=>Number(String(e.id).split("-").pop())).filter(Number.isFinite);
    return `${prefix}${String((nums.length?Math.max(...nums):0)+1).padStart(3,"0")}`;
  }
  function defaultCommission(role){return role==="affiliate"?50:role==="moderator"?30:0;}
  function showToast(title,detail=""){
    const wrap=$("adminToastContainer"); if(!wrap)return;
    const el=document.createElement("div"); el.className="admin-toast"; el.innerHTML=`<strong>${esc(title)}</strong><span>${esc(detail)}</span>`; wrap.append(el); setTimeout(()=>el.remove(),3600);
  }
  function syncPartner(employee){
    let partners=Store.getPartners().filter(p=>p.id!==employee.id);
    if(["affiliate","moderator"].includes(employee.role)){
      partners.push({id:employee.id,role:employee.role,name:employee.name,phone:employee.phone,pin:employee.password,commissionType:employee.commissionType||"flat",commissionValue:Number(employee.commissionValue)||0,active:employee.active!==false,joinedAt:employee.joinedAt,employeeAccount:true});
    }
    Store.savePartners(partners);
  }
  function metrics(){
    const apps=Store.getEmployeeApplications(), employees=Store.getEmployees();
    const values=[
      ["অপেক্ষমাণ আবেদন",apps.filter(a=>a.status==="Pending").length],
      ["Approved কর্মী",employees.filter(e=>e.status==="Approved").length],
      ["সক্রিয় Account",employees.filter(e=>e.active!==false).length],
      ["Role সংখ্যা",new Set(employees.filter(e=>e.active!==false).map(e=>e.role)).size]
    ];
    $("employeeMetrics").innerHTML=values.map(([a,b])=>`<article class="employee-metric"><span>${a}</span><strong>${Number(b).toLocaleString("bn-BD")}</strong></article>`).join("");
    const pending=apps.filter(a=>a.status==="Pending").length; const badge=$("employeeNavCount"); if(badge)badge.textContent=pending;
  }
  function renderApplications(){
    const list=$("employeeApplicationList"), empty=$("employeeApplicationEmpty"); if(!list)return;
    let rows=[...Store.getEmployeeApplications()].sort((a,b)=>new Date(b.submittedAt)-new Date(a.submittedAt));
    const q=applicationQuery.toLowerCase();
    if(q)rows=rows.filter(a=>`${a.id} ${a.name} ${a.phone} ${a.district} ${a.preferredRole}`.toLowerCase().includes(q));
    if(applicationStatus!=="all")rows=rows.filter(a=>a.status===applicationStatus);
    list.innerHTML=rows.map(a=>`<article class="employee-application-card" data-application-id="${esc(a.id)}"><div class="employee-app-top"><div><h4>${esc(a.name)}</h4><p>${esc(a.id)} · ${esc(a.phone)}</p></div><span class="employee-status ${statusClass(a.status)}">${esc(a.status)}</span></div><div class="employee-app-meta"><span>আগ্রহ: ${esc(roleLabel(a.preferredRole))}</span><span>${esc(a.district||"")} · ${esc(a.upazila||"")}</span><span>${date(a.submittedAt)}</span></div><p class="employee-app-note">${esc(a.note||"কোনো অতিরিক্ত তথ্য নেই।")}</p>${a.experience?`<p class="employee-app-note"><strong>অভিজ্ঞতা:</strong> ${esc(a.experience)}</p>`:""}${a.adminNote?`<p class="employee-app-note"><strong>Admin note:</strong> ${esc(a.adminNote)}</p>`:""}<div class="employee-app-actions">${a.status==="Pending"?`<button class="primary-button small-button" data-approve-application="${esc(a.id)}">Approve ও Role দিন</button><button class="danger-button small-button" data-reject-application="${esc(a.id)}">Reject</button>`:`<button class="secondary-button small-button" data-view-application="${esc(a.id)}">Details</button>`}</div></article>`).join("");
    empty.classList.toggle("hidden",rows.length>0);
  }
  function renderEmployees(){
    const body=$("employeeAccountBody"), empty=$("employeeAccountEmpty"); if(!body)return;
    let rows=[...Store.getEmployees()].sort((a,b)=>new Date(b.joinedAt)-new Date(a.joinedAt));
    const q=employeeQuery.toLowerCase(); if(q)rows=rows.filter(e=>`${e.id} ${e.name} ${e.phone} ${e.role}`.toLowerCase().includes(q));
    body.innerHTML=rows.map(e=>`<tr data-employee-id="${esc(e.id)}"><td><strong>${esc(e.name)}</strong><small class="employee-login-hint">${esc(e.id)} · ${esc(e.phone)}</small></td><td><select class="employee-role-select" data-role-select>${roleOptions.map(([v,l])=>`<option value="${v}" ${v===e.role?"selected":""}>${l}</option>`).join("")}</select></td><td><select class="employee-role-select" data-commission-type><option value="flat" ${e.commissionType!=="percent"?"selected":""}>Flat</option><option value="percent" ${e.commissionType==="percent"?"selected":""}>%</option></select> <input class="employee-commission-input" data-commission-value type="number" min="0" value="${Number(e.commissionValue)||0}" style="width:72px"></td><td><span class="employee-status ${e.active===false?"inactive":"active"}">${e.active===false?"বন্ধ":"সক্রিয়"}</span><small class="employee-login-hint">Password: ••••••••</small></td><td>${date(e.joinedAt)}</td><td><div class="row-actions"><button class="small-btn primary" data-save-employee>Save</button><button class="small-btn" data-copy-employee>Login কপি</button><button class="small-btn" data-reset-password>Password Reset</button><button class="small-btn" data-toggle-employee>${e.active===false?"চালু":"বন্ধ"}</button><button class="small-btn danger" data-delete-employee>মুছুন</button></div></td></tr>`).join("");
    empty.classList.toggle("hidden",rows.length>0);
  }
  function render(){metrics();renderApplications();renderEmployees();}
  function ensureModal(){
    if($("employeeApprovalModal"))return;
    const root=document.createElement("div"); root.id="employeeApprovalModal"; root.className="employee-modal-backdrop";
    root.innerHTML=`<div class="employee-modal-card"><span class="section-label">Approve application</span><h3 id="employeeModalTitle">Employee account তৈরি করুন</h3><p id="employeeModalSummary"></p><form id="employeeApprovalForm" class="employee-modal-form"><label>নির্ধারিত Role<select name="role">${roleOptions.map(([v,l])=>`<option value="${v}">${l}</option>`).join("")}</select></label><label>Employee ID<input name="employeeId" required></label><label>Temporary Password<input name="password" required minlength="6"></label><label>Commission Type<select name="commissionType"><option value="flat">Flat amount</option><option value="percent">Percentage</option></select></label><label>Commission Value<input name="commissionValue" type="number" min="0" value="0"></label><label class="span-two">Admin Note<textarea name="adminNote" rows="3" placeholder="ঐচ্ছিক"></textarea></label><div class="credential-box span-two"><strong>সতর্কতা</strong>Approve করার পর Employee ID ও password আবেদনকারীকে নিরাপদভাবে দিন।</div><div class="employee-modal-actions span-two"><button type="button" class="secondary-button" data-close-employee-modal>বাতিল</button><button class="primary-button">Approve ও Account তৈরি</button></div></form></div>`;
    document.body.append(root);
    root.addEventListener("click",e=>{if(e.target===root||e.target.closest("[data-close-employee-modal]"))closeModal();});
    $("employeeApprovalForm").addEventListener("submit",approveApplication);
  }
  function openApprove(id){
    ensureModal(); activeApplicationId=id; const app=Store.getEmployeeApplications().find(a=>a.id===id); if(!app)return;
    const form=$("employeeApprovalForm"); const role=roleOptions.some(([v])=>v===app.preferredRole)?app.preferredRole:"affiliate";
    $("employeeModalTitle").textContent=`${app.name}-এর Employee account`;
    $("employeeModalSummary").textContent=`${app.id} · ${app.phone} · পছন্দ: ${roleLabel(app.preferredRole)}`;
    form.elements.role.value=role; form.elements.employeeId.value=nextEmployeeId(role); form.elements.password.value=randomPassword(); form.elements.commissionType.value="flat"; form.elements.commissionValue.value=defaultCommission(role); form.elements.adminNote.value="";
    form.elements.role.onchange=()=>{form.elements.employeeId.value=nextEmployeeId(form.elements.role.value);form.elements.commissionValue.value=defaultCommission(form.elements.role.value);};
    $("employeeApprovalModal").classList.add("open");
  }
  function closeModal(){const modal=$("employeeApprovalModal");if(modal)modal.classList.remove("open");activeApplicationId="";}
  function approveApplication(event){
    event.preventDefault(); const apps=Store.getEmployeeApplications(), app=apps.find(a=>a.id===activeApplicationId); if(!app)return;
    const fd=Object.fromEntries(new FormData(event.currentTarget).entries()); const id=String(fd.employeeId||"").trim().toUpperCase();
    if(Store.getEmployees().some(e=>e.id===id)){showToast("Employee ID আগে থেকেই আছে",id);return;}
    const now=new Date().toISOString(); const employee={id,applicationId:app.id,name:app.name,phone:app.phone,whatsapp:app.whatsapp,email:app.email,district:app.district,upazila:app.upazila,address:app.address,facebook:app.facebook,experience:app.experience,role:fd.role,password:String(fd.password),commissionType:fd.commissionType,commissionValue:Number(fd.commissionValue)||0,status:"Approved",active:true,joinedAt:now,updatedAt:now};
    const employees=Store.getEmployees();employees.push(employee);Store.saveEmployees(employees);syncPartner(employee);
    app.status="Approved";app.assignedRole=employee.role;app.employeeId=employee.id;app.adminNote=fd.adminNote||"";app.updatedAt=now;Store.saveEmployeeApplications(apps);closeModal();render();
    navigator.clipboard?.writeText(`Earphone BD Employee Login\nID: ${employee.id}\nPassword: ${employee.password}\nLogin: employee.html`).catch(()=>{});
    showToast("Employee account তৈরি হয়েছে",`ID: ${employee.id} · Password: ${employee.password}`);
  }
  function rejectApplication(id){
    const note=prompt("Reject করার কারণ বা Admin note লিখুন:",""); if(note===null)return;
    const apps=Store.getEmployeeApplications(),app=apps.find(a=>a.id===id);if(!app)return;app.status="Rejected";app.adminNote=note;app.updatedAt=new Date().toISOString();Store.saveEmployeeApplications(apps);render();showToast("আবেদন Reject করা হয়েছে",id);
  }
  function employeeFromRow(row){return Store.getEmployees().find(e=>e.id===row.dataset.employeeId);}
  function saveEmployee(row){
    const employees=Store.getEmployees(),e=employees.find(v=>v.id===row.dataset.employeeId);if(!e)return;e.role=row.querySelector("[data-role-select]").value;e.commissionType=row.querySelector("[data-commission-type]").value;e.commissionValue=Number(row.querySelector("[data-commission-value]").value)||0;e.updatedAt=new Date().toISOString();Store.saveEmployees(employees);syncPartner(e);const apps=Store.getEmployeeApplications();const app=apps.find(a=>a.id===e.applicationId);if(app){app.assignedRole=e.role;app.updatedAt=e.updatedAt;Store.saveEmployeeApplications(apps);}render();showToast("Employee update হয়েছে",e.id);
  }
  function copyLogin(row){const e=employeeFromRow(row);if(!e)return;const text=`Earphone BD Employee Login\nEmployee ID: ${e.id}\nPassword: ${e.password}\nRole: ${roleLabel(e.role)}\nLogin page: employee.html`;navigator.clipboard?.writeText(text).then(()=>showToast("Login তথ্য কপি হয়েছে",e.id)).catch(()=>prompt("Copy করুন:",text));}
  function resetPassword(row){const employees=Store.getEmployees(),e=employees.find(v=>v.id===row.dataset.employeeId);if(!e)return;const value=prompt("নতুন password দিন:",randomPassword());if(!value)return;if(value.length<6){showToast("Password কমপক্ষে ৬ অক্ষরের হতে হবে");return;}e.password=value;e.updatedAt=new Date().toISOString();Store.saveEmployees(employees);syncPartner(e);showToast("Password reset হয়েছে",e.id);copyLogin(row);}
  function toggleEmployee(row){const employees=Store.getEmployees(),e=employees.find(v=>v.id===row.dataset.employeeId);if(!e)return;e.active=e.active===false;e.updatedAt=new Date().toISOString();Store.saveEmployees(employees);syncPartner(e);render();showToast(e.active?"Account চালু হয়েছে":"Account বন্ধ হয়েছে",e.id);}
  function deleteEmployee(row){const e=employeeFromRow(row);if(!e||!confirm(`${e.name}-এর Employee account মুছবেন?`))return;Store.saveEmployees(Store.getEmployees().filter(v=>v.id!==e.id));Store.savePartners(Store.getPartners().filter(v=>v.id!==e.id));render();showToast("Employee account মুছে ফেলা হয়েছে",e.id);}
  function exportCsv(){
    const header=["Employee ID","Name","Phone","Role","Status","Commission Type","Commission Value","District","Upazila","Joined"];
    const rows=Store.getEmployees().map(e=>[e.id,e.name,e.phone,e.role,e.active===false?"Inactive":"Active",e.commissionType,e.commissionValue,e.district,e.upazila,e.joinedAt]);
    const csv=[header,...rows].map(r=>r.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"}));a.download=`earphone-bd-employees-${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(a.href);
  }
  function bind(){
    $("employeeApplicationSearch")?.addEventListener("input",e=>{applicationQuery=e.target.value.trim();renderApplications();});
    $("employeeApplicationStatus")?.addEventListener("change",e=>{applicationStatus=e.target.value;renderApplications();});
    $("employeeAccountSearch")?.addEventListener("input",e=>{employeeQuery=e.target.value.trim();renderEmployees();});
    $("exportEmployeesButton")?.addEventListener("click",exportCsv);
    document.addEventListener("click",e=>{
      const approve=e.target.closest("[data-approve-application]");if(approve)openApprove(approve.dataset.approveApplication);
      const reject=e.target.closest("[data-reject-application]");if(reject)rejectApplication(reject.dataset.rejectApplication);
      const view=e.target.closest("[data-view-application]");if(view){const a=Store.getEmployeeApplications().find(x=>x.id===view.dataset.viewApplication);if(a)alert(`নাম: ${a.name}\nফোন: ${a.phone}\nপছন্দের কাজ: ${roleLabel(a.preferredRole)}\nনির্ধারিত role: ${roleLabel(a.assignedRole)}\nজেলা: ${a.district} · ${a.upazila}\nঅভিজ্ঞতা: ${a.experience||"নেই"}\nFacebook: ${a.facebook||"নেই"}\nঠিকানা: ${a.address||""}\nNote: ${a.note||""}\nAdmin note: ${a.adminNote||""}`);}
      const row=e.target.closest("tr[data-employee-id]");if(!row)return;
      if(e.target.closest("[data-save-employee]"))saveEmployee(row);if(e.target.closest("[data-copy-employee]"))copyLogin(row);if(e.target.closest("[data-reset-password]"))resetPassword(row);if(e.target.closest("[data-toggle-employee]"))toggleEmployee(row);if(e.target.closest("[data-delete-employee]"))deleteEmployee(row);
    });
    document.querySelectorAll('[data-view="employees"]').forEach(b=>b.addEventListener("click",()=>setTimeout(render,0)));
    window.addEventListener("storage",event=>{if([Store.STORAGE_KEYS.employeeApplications,Store.STORAGE_KEYS.employees].includes(event.key))render();});
  }
  document.addEventListener("DOMContentLoaded",()=>{ensureModal();bind();render();});
})();
