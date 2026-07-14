(() => {
  "use strict";
  const Store = window.EarphoneBdStoreData;
  const role = document.body.dataset.role || "affiliate";
  const roleBn = role === "moderator" ? "মডারেটর" : "অ্যাফিলিয়েট";
  const SESSION_KEY = "earphoneBdEmployeeSession";
  const PAYOUT_PROFILE_PREFIX = "earphoneBdPayoutProfile:";
  const $ = (id) => document.getElementById(id);
  let employee = null;
  let partner = null;
  let products = [];
  const els = {
    dashboard: $("dashboardView"), logout: $("logoutButton"), welcomeName: $("welcomeName"), welcomeRole: $("welcomeRole"), partnerCodeLabel: $("partnerCodeLabel"), commissionLabel: $("commissionLabel"),
    metricSubmitted: $("metricSubmitted"), metricDelivered: $("metricDelivered"), metricPayable: $("metricPayable"), metricPaid: $("metricPaid"), tabs: $("portalTabs"), panels: [...document.querySelectorAll("[data-panel]")],
    orderForm: $("partnerOrderForm"), product: $("productSelect"), quantity: $("quantity"), district: $("districtSelect"), upazila: $("upazilaSelect"), orderPreview: $("orderPreview"), ordersBody: $("ordersBody"), ordersEmpty: $("ordersEmpty"),
    payoutAvailable: $("payoutAvailable"), payoutForm: $("payoutForm"), payoutsBody: $("payoutsBody"), payoutsEmpty: $("payoutsEmpty"), toast: $("toastWrap")
  };
  const money = (v) => `৳${Math.round(Number(v)||0).toLocaleString("bn-BD")}`;
  const escapeHTML = (v) => String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);
  const statusClass = (v) => String(v||"").toLowerCase().replaceAll(" ","-");
  const showToast = (title, text="") => { const t=document.createElement("div"); t.className="toast"; t.innerHTML=`<strong>${escapeHTML(title)}</strong>${text?`<span>${escapeHTML(text)}</span>`:""}`; els.toast.appendChild(t); setTimeout(()=>t.remove(),3200); };

  function readSession(){try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)||"null");}catch{return null;}}
  function authorize(){
    const session=readSession();
    if(!session?.employeeId){location.replace("employee.html?view=login");return false;}
    employee=Store.getEmployees().find(e=>e.id===session.employeeId && e.status==="Approved" && e.active!==false) || null;
    if(!employee){sessionStorage.removeItem(SESSION_KEY);location.replace("employee.html?view=login");return false;}
    if(employee.role!==role){location.replace(Store.employeeRoute(employee.role));return false;}
    const saved=Store.getPartners().find(p=>p.id===employee.id && p.role===role && p.active!==false);
    partner=saved || {id:employee.id,role:employee.role,name:employee.name,phone:employee.phone,commissionType:employee.commissionType||"flat",commissionValue:Number(employee.commissionValue)||0,active:true};
    els.dashboard.classList.remove("hidden");
    return true;
  }
  const partnerOrders = () => Store.getOrders().filter(o => o.partner?.id === partner?.id);
  const partnerPayouts = () => Store.getPayouts().filter(p => p.partnerId === partner?.id);
  const commissionFor = (subtotal) => partner.commissionType === "percent" ? Math.round(subtotal * Number(partner.commissionValue||0) / 100) : Number(partner.commissionValue||0);
  const payoutProfileKey = () => `${PAYOUT_PROFILE_PREFIX}${partner?.id || "guest"}`;
  function loadPayoutProfile(){
    if(!partner || !els.payoutForm)return;
    let saved={};
    try{saved=JSON.parse(localStorage.getItem(payoutProfileKey())||"{}");}catch{saved={};}
    const employeeProfile=Store.getEmployees().find(e=>e.id===partner.id)||{};
    const latest=[...partnerPayouts()].sort((a,b)=>new Date(b.requestedAt)-new Date(a.requestedAt))[0]||{};
    const method=saved.method||employeeProfile.payoutMethod||latest.method||"bKash";
    const account=saved.account||employeeProfile.payoutAccount||latest.account||"";
    const methodInput=els.payoutForm.elements.method,accountInput=els.payoutForm.elements.account;
    if(methodInput)methodInput.value=method;
    if(accountInput)accountInput.value=account;
  }
  function savePayoutProfile(){
    if(!partner || !els.payoutForm)return;
    const method=String(els.payoutForm.elements.method?.value||"bKash").trim();
    const account=String(els.payoutForm.elements.account?.value||"").trim();
    localStorage.setItem(payoutProfileKey(),JSON.stringify({method,account,updatedAt:new Date().toISOString()}));
    const employees=Store.getEmployees();
    const index=employees.findIndex(e=>e.id===partner.id);
    if(index>=0){employees[index]={...employees[index],payoutMethod:method,payoutAccount:account};Store.saveEmployees(employees);}
  }
  const usedOrderIds = () => new Set(partnerPayouts().filter(p=>p.status!=="Rejected").flatMap(p=>p.orderIds||[]));
  const payableOrders = () => { const used=usedOrderIds(); return partnerOrders().filter(o=>o.status==="Delivered" && !used.has(o.id)); };
  function populateLocations(){ const L=window.BangladeshLocations; els.district.innerHTML='<option value="">জেলা নির্বাচন করুন</option>'+L.districts.map(d=>`<option>${escapeHTML(d)}</option>`).join(""); els.district.addEventListener("change",()=>{ const list=L.upazilasFor(els.district.value); els.upazila.disabled=!list.length; els.upazila.innerHTML=list.length?'<option value="">উপজেলা / থানা নির্বাচন করুন</option>'+list.map(u=>`<option>${escapeHTML(u)}</option>`).join(""):'<option value="">আগে জেলা নির্বাচন করুন</option>'; updatePreview(); }); }
  function populateProducts(){ products=Store.getProducts().filter(p=>p.active!==false&&p.available!==false).sort((a,b)=>a.priority-b.priority); els.product.innerHTML='<option value="">পণ্য নির্বাচন করুন</option>'+products.map(p=>`<option value="${p.id}">${escapeHTML(p.name)} · ${escapeHTML(p.color)} · ${money(p.price)}</option>`).join(""); }
  function selectedProduct(){ return products.find(p=>Number(p.id)===Number(els.product.value)); }
  function updatePreview(){ const p=selectedProduct(); const q=Math.max(1,Number(els.quantity.value)||1); const subtotal=p?p.price*q:0; const settings=Store.getSettings(); const delivery=!subtotal?0:(els.district.value==="ঢাকা"?Number(settings.insideDhakaDeliveryFee||0):Number(settings.outsideDhakaDeliveryFee||0)); const commission=commissionFor(subtotal); els.orderPreview.innerHTML=`<div><span>পণ্যের মূল্য</span><strong>${money(subtotal)}</strong></div><div><span>ডেলিভারি</span><strong>${money(delivery)}</strong></div><div><span>আপনার সম্ভাব্য কমিশন</span><strong>${money(commission)}</strong></div><div class="total"><span>কাস্টমারের মোট</span><strong>${money(subtotal+delivery)}</strong></div>`; }
  function renderSummary(){ const orders=partnerOrders(); const payouts=partnerPayouts(); const payable=payableOrders().reduce((s,o)=>s+Number(o.partner?.commissionAmount||0),0); const paid=payouts.filter(p=>p.status==="Paid").reduce((s,p)=>s+Number(p.amount||0),0); els.metricSubmitted.textContent=orders.length.toLocaleString("bn-BD"); els.metricDelivered.textContent=orders.filter(o=>o.status==="Delivered").length.toLocaleString("bn-BD"); els.metricPayable.textContent=money(payable); els.metricPaid.textContent=money(paid); els.payoutAvailable.textContent=money(payable); }
  function renderOrders(){ const rows=[...partnerOrders()].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); els.ordersBody.innerHTML=rows.map(o=>`<tr><td><strong>${escapeHTML(o.id)}</strong><br><small>${new Date(o.createdAt).toLocaleDateString("bn-BD")}</small></td><td>${escapeHTML(o.customer?.name||"")}<br><small>${escapeHTML(o.customer?.phone||"")}</small></td><td>${escapeHTML((o.items||[])[0]?.name||"")} × ${Number((o.items||[])[0]?.quantity||1).toLocaleString("bn-BD")}</td><td>${money(o.totals?.total)}</td><td><span class="status status-${statusClass(o.status)}">${escapeHTML(o.status)}</span></td><td>${money(o.partner?.commissionAmount||0)}</td></tr>`).join(""); els.ordersEmpty.classList.toggle("hidden",rows.length>0); }
  function renderPayouts(){ const rows=[...partnerPayouts()].sort((a,b)=>new Date(b.requestedAt)-new Date(a.requestedAt)); els.payoutsBody.innerHTML=rows.map(p=>`<tr><td><strong>${escapeHTML(p.id)}</strong><br><small>${new Date(p.requestedAt).toLocaleDateString("bn-BD")}</small></td><td>${money(p.amount)}</td><td>${escapeHTML(p.method)}<br><small>${escapeHTML(p.account)}</small></td><td>${(p.orderIds||[]).length.toLocaleString("bn-BD")}টি</td><td><span class="status status-${statusClass(p.status)}">${escapeHTML(p.status)}</span></td></tr>`).join(""); els.payoutsEmpty.classList.toggle("hidden",rows.length>0); }
  function renderAll(){ els.welcomeName.textContent=partner.name; els.welcomeRole.textContent=roleBn; els.partnerCodeLabel.textContent=partner.id; els.commissionLabel.textContent=partner.commissionType==="percent"?`${partner.commissionValue}% কমিশন`:`প্রতি ডেলিভারিতে ${money(partner.commissionValue)}`; populateProducts(); renderSummary(); renderOrders(); renderPayouts(); updatePreview(); }
  function submitOrder(e){ e.preventDefault(); const fd=new FormData(els.orderForm); const p=selectedProduct(); if(!p){showToast("পণ্য নির্বাচন করুন");return;} const phone=String(fd.get("phone")||"").replace(/\D/g,"");if(!/^01[3-9]\d{8}$/.test(phone)){showToast("সঠিক মোবাইল নম্বর দিন");return;} const q=Math.max(1,Number(fd.get("quantity"))||1); const subtotal=p.price*q; const settings=Store.getSettings(); const delivery=fd.get("district")==="ঢাকা"?Number(settings.insideDhakaDeliveryFee||0):Number(settings.outsideDhakaDeliveryFee||0); const commission=commissionFor(subtotal); const id=`${role==="moderator"?"MOD":"AFF"}-${Date.now().toString().slice(-8)}`; const now=new Date().toISOString(); const order={id,createdAt:now,updatedAt:now,customer:{name:fd.get("name"),phone,district:fd.get("district"),upazila:fd.get("upazila"),thana:fd.get("upazila"),address:fd.get("address"),customerNote:fd.get("note")||"",payment:"Cash on Delivery"},items:[{id:p.id,sku:p.sku,slug:p.slug,name:p.name,edition:p.edition,color:p.color,image:p.image,price:p.price,cost:p.cost,quantity:q}],totals:{subtotal,delivery,discount:0,total:subtotal+delivery},status:"Pending",paymentStatus:"Unpaid",source:role,partner:{id:partner.id,role:partner.role,name:partner.name,commissionType:partner.commissionType,commissionValue:partner.commissionValue,commissionAmount:commission},timeline:[{status:"Pending",at:now,note:`${roleBn} প্যানেল থেকে অর্ডার জমা হয়েছে`}],notes:"",courier:"",trackingCode:""}; const orders=Store.getOrders(); orders.push(order); Store.saveOrders(orders); els.orderForm.reset(); els.upazila.disabled=true; els.upazila.innerHTML='<option value="">আগে জেলা নির্বাচন করুন</option>'; renderAll(); showToast("অর্ডার জমা হয়েছে",id); switchPanel("orders"); }
  function requestPayout(e){ e.preventDefault(); const eligible=payableOrders(); const amount=eligible.reduce((s,o)=>s+Number(o.partner?.commissionAmount||0),0); if(amount<=0){showToast("পেআউট পাওয়া যাচ্ছে না","ডেলিভারড অর্ডারের কমিশন হলে অনুরোধ করতে পারবেন।");return;} const fd=new FormData(els.payoutForm); const method=String(fd.get("method")||"bKash").trim(); const account=String(fd.get("account")||"").trim(); if(!account){showToast("পেমেন্ট নম্বর দিন");return;} if(["bKash","Nagad"].includes(method)&&!/^01[3-9]\d{8}$/.test(account.replace(/\D/g,""))){showToast("সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন");return;} savePayoutProfile(); const payouts=Store.getPayouts(); const now=new Date().toISOString(); const request={id:`PAY-${Date.now().toString().slice(-8)}`,partnerId:partner.id,partnerName:partner.name,role:partner.role,amount,method,account,status:"Requested",orderIds:eligible.map(o=>o.id),requestedAt:now,updatedAt:now,paidAt:"",note:""}; payouts.push(request); Store.savePayouts(payouts); renderAll(); loadPayoutProfile(); showToast("পেআউট অনুরোধ পাঠানো হয়েছে",money(amount)); }
  function switchPanel(name){ document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===name)); els.panels.forEach(p=>p.classList.toggle("active",p.dataset.panel===name)); }
  function logout(){sessionStorage.removeItem(SESSION_KEY);sessionStorage.removeItem("earphoneBdAdminSession");location.replace("employee.html?view=login");}
  if(!authorize())return;
  populateLocations(); loadPayoutProfile();
  els.logout.addEventListener("click",logout); els.tabs.addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(b)switchPanel(b.dataset.tab);}); els.product.addEventListener("change",updatePreview); els.quantity.addEventListener("input",updatePreview); els.orderForm.addEventListener("submit",submitOrder); els.payoutForm.addEventListener("submit",requestPayout); els.payoutForm.elements.method?.addEventListener("change",savePayoutProfile); els.payoutForm.elements.account?.addEventListener("input",savePayoutProfile); window.addEventListener("storage",()=>{if(!authorize())return;renderAll();loadPayoutProfile();}); renderAll();
})();
