(() => {
  "use strict";

  const Store = window.EarphoneBdStoreData;
  const ADMIN_EMAIL = "admin@earphonebd.com";
  const ADMIN_PASSWORD = "Earphone@2026";
  const SESSION_KEY = "earphoneBdAdminSession";
  const ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Partial Delivered", "Returned", "Hold", "Cancelled"];
  const PAYMENT_STATUSES = ["Unpaid", "Pending", "Paid", "Refunded"];

  const state = {
    products: Store.getProducts(),
    orders: Store.getOrders(),
    coupons: Store.getCoupons(),
    settings: Store.getSettings(),
    subscribers: Store.getSubscribers(),
    currentView: "dashboard",
    productSearch: "",
    productCategory: "All",
    productStatus: "All",
    orderSearch: "",
    orderStatus: "All",
    paymentStatus: "All",
    customerSearch: "",
    editingProductId: null,
    editingCouponCode: null,
    openOrderId: null,
    confirmCallback: null
  };

  const elements = {
    loginScreen: document.getElementById("loginScreen"),
    loginForm: document.getElementById("loginForm"),
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword"),
    loginError: document.getElementById("loginError"),
    togglePassword: document.getElementById("togglePassword"),
    adminShell: document.getElementById("adminShell"),
    sidebar: document.getElementById("sidebar"),
    sidebarClose: document.getElementById("sidebarClose"),
    menuToggle: document.getElementById("menuToggle"),
    logoutButton: document.getElementById("logoutButton"),
    topbarDate: document.getElementById("topbarDate"),
    viewTitle: document.getElementById("viewTitle"),
    globalAdminSearch: document.getElementById("globalAdminSearch"),
    exportButton: document.getElementById("exportButton"),
    settingsExportButton: document.getElementById("settingsExportButton"),
    quickAddProduct: document.getElementById("quickAddProduct"),
    productNavCount: document.getElementById("productNavCount"),
    orderNavCount: document.getElementById("orderNavCount"),
    customerNavCount: document.getElementById("customerNavCount"),
    metricRevenue: document.getElementById("metricRevenue"),
    metricRevenueNote: document.getElementById("metricRevenueNote"),
    metricProfit: document.getElementById("metricProfit"),
    metricProfitNote: document.getElementById("metricProfitNote"),
    metricInventoryValue: document.getElementById("metricInventoryValue"),
    metricInventoryValueNote: document.getElementById("metricInventoryValueNote"),
    metricOrders: document.getElementById("metricOrders"),
    metricOrdersNote: document.getElementById("metricOrdersNote"),
    metricProducts: document.getElementById("metricProducts"),
    metricProductsNote: document.getElementById("metricProductsNote"),
    metricLowStock: document.getElementById("metricLowStock"),
    metricLowStockNote: document.getElementById("metricLowStockNote"),
    chartRange: document.getElementById("chartRange"),
    salesChart: document.getElementById("salesChart"),
    chartEmpty: document.getElementById("chartEmpty"),
    statusBreakdown: document.getElementById("statusBreakdown"),
    recentOrdersBody: document.getElementById("recentOrdersBody"),
    recentOrdersEmpty: document.getElementById("recentOrdersEmpty"),
    lowStockList: document.getElementById("lowStockList"),
    lowStockEmpty: document.getElementById("lowStockEmpty"),
    addProductButton: document.getElementById("addProductButton"),
    bulkImportButton: document.getElementById("bulkImportButton"),
    exportProductsButton: document.getElementById("exportProductsButton"),
    productSearch: document.getElementById("productSearch"),
    productCategoryFilter: document.getElementById("productCategoryFilter"),
    productStatusFilter: document.getElementById("productStatusFilter"),
    resetProductFilters: document.getElementById("resetProductFilters"),
    bulkPublishButton: document.getElementById("bulkPublishButton"),
    productTableSummary: document.getElementById("productTableSummary"),
    productTableBody: document.getElementById("productTableBody"),
    productTableEmpty: document.getElementById("productTableEmpty"),
    orderStats: document.getElementById("orderStats"),
    orderSearch: document.getElementById("orderSearch"),
    orderStatusFilter: document.getElementById("orderStatusFilter"),
    paymentStatusFilter: document.getElementById("paymentStatusFilter"),
    resetOrderFilters: document.getElementById("resetOrderFilters"),
    exportOrdersButton: document.getElementById("exportOrdersButton"),
    orderTableSummary: document.getElementById("orderTableSummary"),
    orderTableBody: document.getElementById("orderTableBody"),
    orderTableEmpty: document.getElementById("orderTableEmpty"),
    customerCountMetric: document.getElementById("customerCountMetric"),
    repeatCustomerMetric: document.getElementById("repeatCustomerMetric"),
    subscriberMetric: document.getElementById("subscriberMetric"),
    customerValueMetric: document.getElementById("customerValueMetric"),
    customerSearch: document.getElementById("customerSearch"),
    customerTableBody: document.getElementById("customerTableBody"),
    customerTableEmpty: document.getElementById("customerTableEmpty"),
    exportCustomersButton: document.getElementById("exportCustomersButton"),
    couponGrid: document.getElementById("couponGrid"),
    couponEmpty: document.getElementById("couponEmpty"),
    addCouponButton: document.getElementById("addCouponButton"),
    settingsForm: document.getElementById("settingsForm"),
    legacyBackupInput: document.getElementById("legacyBackupInput"),
    importLegacyBackupButton: document.getElementById("importLegacyBackupButton"),
    replaceLegacyOrders: document.getElementById("replaceLegacyOrders"),
    legacyImportStatus: document.getElementById("legacyImportStatus"),
    resetStoreButton: document.getElementById("resetStoreButton"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    productModal: document.getElementById("productModal"),
    productModalTitle: document.getElementById("productModalTitle"),
    productForm: document.getElementById("productForm"),
    productImagePreview: document.getElementById("productImagePreview"),
    productImageFile: document.getElementById("productImageFile"),
    productProfitPreview: document.getElementById("productProfitPreview"),
    bulkProductModal: document.getElementById("bulkProductModal"),
    bulkProductForm: document.getElementById("bulkProductForm"),
    bulkProductText: document.getElementById("bulkProductText"),
    bulkPreview: document.getElementById("bulkPreview"),
    bulkReplaceExisting: document.getElementById("bulkReplaceExisting"),
    orderModal: document.getElementById("orderModal"),
    orderModalTitle: document.getElementById("orderModalTitle"),
    orderModalBody: document.getElementById("orderModalBody"),
    couponModal: document.getElementById("couponModal"),
    couponModalTitle: document.getElementById("couponModalTitle"),
    couponForm: document.getElementById("couponForm"),
    confirmModal: document.getElementById("confirmModal"),
    confirmTitle: document.getElementById("confirmTitle"),
    confirmMessage: document.getElementById("confirmMessage"),
    confirmCancel: document.getElementById("confirmCancel"),
    confirmProceed: document.getElementById("confirmProceed"),
    toastContainer: document.getElementById("adminToastContainer")
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeImage(value) {
    const fallback = Store.productArtwork("Earphone BD", "Product image");
    const text = String(value || "").trim();
    if (!text || /^javascript:/i.test(text)) return fallback;
    return escapeHTML(text);
  }

  function money(value) {
    const currency = state.settings.currency || "৳";
    const amount = Math.round(Number(value) || 0).toLocaleString("en-US");
    return currency === "৳" ? `৳${amount}` : `${currency} ${amount}`;
  }

  function formatDate(value, includeTime = false) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not available";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {})
    }).format(date);
  }

  function slugStatus(value) {
    return String(value || "").trim().toLowerCase().replaceAll(" ", "-");
  }

  const FEATURE_ORDER = ["বেস", "সাউন্ড", "ব্যাটারি", "মাইক্রোফোন", "গেমিং", "ANC", "বাজেট"];
  function productFeatureTags(product) {
    const source = [...(product.bestFor || []), ...(product.features || []), product.badge || "", product.name || "", product.description || ""].join(" ").toLowerCase();
    const tags = [];
    const has = (...terms) => terms.some((term) => source.includes(term));
    if (has("বেস", "bass")) tags.push("বেস");
    if (has("সাউন্ড", "sound", "stereo", "hi-fi", "hifi")) tags.push("সাউন্ড");
    if (has("ব্যাটারি", "battery", "playback", "hour", "ঘণ্টা", "চার্জ")) tags.push("ব্যাটারি");
    if (has("মাইক্রোফোন", "microphone", "clear mic", "hd call", "calling", "call quality")) tags.push("মাইক্রোফোন");
    if (has("গেমিং", "gaming", "low latency", "ল্যাটেন্সি")) tags.push("গেমিং");
    if (has("anc", "active noise cancellation", "নয়েজ ক্যানসেল")) tags.push("ANC");
    if (Number(product.price) <= 550 || has("বাজেট", "budget")) tags.push("বাজেট");
    return FEATURE_ORDER.filter((tag) => tags.includes(tag));
  }

  function showToast(title, message = "") {
    const toast = document.createElement("div");
    toast.className = "admin-toast";
    toast.innerHTML = `<strong>${escapeHTML(title)}</strong>${message ? `<span>${escapeHTML(message)}</span>` : ""}`;
    elements.toastContainer.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3300);
  }

  function downloadFile(filename, content, type = "application/json") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function csvCell(value) {
    const text = String(value ?? "").replaceAll('"', '""');
    return `"${text}"`;
  }

  function refreshState() {
    state.products = Store.getProducts();
    state.orders = Store.getOrders().map(normalizeOrder);
    state.coupons = Store.getCoupons();
    state.settings = Store.getSettings();
    state.subscribers = Store.getSubscribers();
    document.documentElement.style.setProperty("--accent", state.settings.accentColor || "#14c7a4");
  }

  function normalizeOrder(order) {
    const paymentMethod = order?.customer?.payment || order?.paymentMethod || "Cash on Delivery";
    return {
      ...order,
      id: order.id || `NS-${Date.now()}`,
      createdAt: order.createdAt || new Date().toISOString(),
      customer: order.customer || {},
      items: Array.isArray(order.items) ? order.items : [],
      totals: order.totals || { subtotal: 0, delivery: 0, discount: 0, total: 0 },
      status: order.status || "Pending",
      paymentStatus: order.paymentStatus || (paymentMethod === "Cash on Delivery" ? "Unpaid" : "Pending"),
      notes: order.notes || "",
      courier: order.courier || "",
      trackingCode: order.trackingCode || "",
      timeline: Array.isArray(order.timeline) ? order.timeline : []
    };
  }

  function getOrderItems(order) {
    return (order.items || []).map((item) => {
      const product = state.products.find((candidate) => Number(candidate.id) === Number(item.id));
      return {
        id: Number(item.id),
        quantity: Math.max(1, Number(item.quantity) || 1),
        name: item.name || product?.name || "Deleted product",
        price: Number(item.price ?? product?.price) || 0,
        cost: Number(item.cost ?? product?.cost) || 0,
        image: item.image || product?.image || "",
        sku: item.sku || product?.sku || "N/A",
        edition: item.edition || product?.edition || "No Edition",
        color: item.color || product?.color || "Not specified"
      };
    });
  }

  function productProfit(product) {
    return Math.max(0, Number(product?.price || 0) - Number(product?.cost || 0));
  }

  function productMargin(product) {
    const price = Number(product?.price || 0);
    return price > 0 ? (productProfit(product) / price) * 100 : 0;
  }

  function orderProfit(order) {
    const itemProfit = getOrderItems(order).reduce((sum, item) => sum + (Number(item.price) - Number(item.cost)) * Number(item.quantity), 0);
    return itemProfit - Number(order.totals?.discount || 0);
  }

  function lowStockThreshold() {
    const value = Number(state.settings.lowStockThreshold);
    return Number.isFinite(value) ? value : 5;
  }

  function productInventoryStatus(product) { if (!product.active) return "Draft"; return product.available === false ? "Unavailable" : "Active"; }

  function getCustomers() {
    const map = new Map();
    state.orders.forEach((order) => {
      const customer = order.customer || {};
      const email = String(customer.email || "").trim().toLowerCase();
      const phone = String(customer.phone || "").trim();
      const key = phone || email || `guest-${order.id}`;
      const current = map.get(key) || {
        key,
        name: customer.name || "Guest customer",
        email: customer.email || "",
        phone,
        city: customer.deliveryArea || customer.city || "",
        orders: 0,
        totalSpent: 0,
        lastOrder: order.createdAt
      };
      current.orders += 1;
      if (order.status !== "Cancelled") current.totalSpent += Number(order.totals?.total) || 0;
      if (new Date(order.createdAt) > new Date(current.lastOrder)) current.lastOrder = order.createdAt;
      if (!current.city && (customer.deliveryArea || customer.city)) current.city = customer.deliveryArea || customer.city;
      map.set(key, current);
    });
    return [...map.values()].sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder));
  }

  function switchView(view) {
    state.currentView = view;
    const titleMap = {
      dashboard: "Dashboard",
      products: "Products",
      orders: "Orders",
      customers: "Customers",
      coupons: "Coupons",
      settings: "Store settings"
    };
    document.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.viewPanel === view);
    });
    document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });
    elements.viewTitle.textContent = titleMap[view] || "Dashboard";
    elements.sidebar.classList.remove("open");
    if (view === "dashboard") window.setTimeout(renderSalesChart, 20);
    if (view === "settings") populateSettingsForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openModal(modal) {
    closeModals(false);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    elements.modalBackdrop.classList.add("show");
    document.body.classList.add("modal-open");
  }

  function closeModals(hideBackdrop = true) {
    document.querySelectorAll(".admin-modal.open, .confirm-modal.open").forEach((modal) => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
    if (hideBackdrop) {
      elements.modalBackdrop.classList.remove("show");
      document.body.classList.remove("modal-open");
    }
  }

  function askConfirmation(title, message, callback) {
    state.confirmCallback = callback;
    elements.confirmTitle.textContent = title;
    elements.confirmMessage.textContent = message;
    openModal(elements.confirmModal);
  }

  function renderNavigationCounts() {
    const customers = getCustomers();
    elements.productNavCount.textContent = state.products.length;
    elements.orderNavCount.textContent = state.orders.length;
    elements.customerNavCount.textContent = customers.length;
  }

  function renderDashboard() {
    const validOrders = state.orders.filter((order) => !["Cancelled", "Returned"].includes(order.status));
    const revenue = validOrders.reduce((sum, order) => sum + (Number(order.totals?.total) || 0), 0);
    const grossProfit = validOrders.reduce((sum, order) => sum + orderProfit(order), 0);
    const delivered = state.orders.filter((order) => order.status === "Delivered").length;
    const activeProducts = state.products.filter((product) => product.active).length;
    const lowStock = state.products.filter((product) => product.active && Number(product.stock) <= Math.max(lowStockThreshold(), Number(product.reorderLevel || 0)));
    const inventoryValue = state.products.reduce((sum, product) => sum + Number(product.cost || 0) * Number(product.stock || 0), 0);
    const potentialProfit = state.products.reduce((sum, product) => sum + productProfit(product) * Number(product.stock || 0), 0);

    elements.metricRevenue.textContent = money(revenue);
    elements.metricRevenueNote.textContent = `${validOrders.length} non-cancelled order${validOrders.length === 1 ? "" : "s"}`;
    elements.metricProfit.textContent = money(grossProfit);
    elements.metricProfitNote.textContent = grossProfit ? `${revenue ? Math.round((grossProfit / revenue) * 100) : 0}% estimated margin after discounts` : "Profit appears after orders are placed";
    elements.metricInventoryValue.textContent = money(inventoryValue);
    elements.metricInventoryValueNote.textContent = `${money(potentialProfit)} potential stock profit`;
    elements.metricOrders.textContent = state.orders.length;
    elements.metricOrdersNote.textContent = state.orders.length ? `${delivered} delivered` : "No orders yet";
    elements.metricProducts.textContent = state.products.length;
    elements.metricProductsNote.textContent = `${activeProducts} active product${activeProducts === 1 ? "" : "s"}`;
    elements.metricLowStock.textContent = lowStock.length;
    elements.metricLowStockNote.textContent = lowStock.length ? "At or below reorder level" : "Inventory looks healthy";

    renderStatusBreakdown();
    renderRecentOrders();
    renderLowStock(lowStock);
    renderSalesChart();
  }


  function renderStatusBreakdown() {
    const total = Math.max(1, state.orders.length);
    elements.statusBreakdown.innerHTML = ORDER_STATUSES.map((status) => {
      const count = state.orders.filter((order) => order.status === status).length;
      const percent = Math.round((count / total) * 100);
      return `
        <div class="status-row">
          <div class="status-row-top"><span>${escapeHTML(status)}</span><span>${count} · ${percent}%</span></div>
          <div class="status-track"><span style="width:${percent}%"></span></div>
        </div>`;
    }).join("");
  }

  function renderRecentOrders() {
    const recent = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    elements.recentOrdersBody.innerHTML = recent.map((order) => `
      <tr>
        <td><strong>${escapeHTML(order.id)}</strong><br><span class="muted-cell">${formatDate(order.createdAt)}</span></td>
        <td>${escapeHTML(order.customer?.name || "Guest")}</td>
        <td><span class="status-pill status-${slugStatus(order.status)}">${escapeHTML(order.status)}</span></td>
        <td><strong>${money(order.totals?.total)}</strong></td>
      </tr>`).join("");
    elements.recentOrdersEmpty.classList.toggle("hidden", recent.length > 0);
  }

  function renderLowStock(products) {
    const sorted = [...products].sort((a, b) => Number(a.stock) - Number(b.stock)).slice(0, 6);
    elements.lowStockList.innerHTML = sorted.map((product) => `
      <div class="low-stock-item">
        <img src="${safeImage(product.image)}" alt="${escapeHTML(product.name)}">
        <div><strong>${escapeHTML(product.name)}</strong><span>${escapeHTML(product.sku)}</span></div>
        <em>${Number(product.stock)} left</em>
      </div>`).join("");
    elements.lowStockEmpty.classList.toggle("hidden", sorted.length > 0);
  }

  function getDailyRevenue(days) {
    const result = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const date = new Date(now);
      date.setDate(now.getDate() - offset);
      const key = date.toISOString().slice(0, 10);
      const revenue = state.orders
        .filter((order) => order.status !== "Cancelled" && String(order.createdAt).slice(0, 10) === key)
        .reduce((sum, order) => sum + (Number(order.totals?.total) || 0), 0);
      result.push({ date, revenue });
    }
    return result;
  }

  function renderSalesChart() {
    if (state.currentView !== "dashboard") return;
    const canvas = elements.salesChart;
    const wrap = canvas.parentElement;
    if (!wrap || wrap.clientWidth === 0) return;
    const days = Number(elements.chartRange.value) || 7;
    const data = getDailyRevenue(days);
    const hasRevenue = data.some((item) => item.revenue > 0);
    elements.chartEmpty.classList.toggle("hidden", hasRevenue);

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(300, wrap.clientWidth);
    const height = Math.max(220, wrap.clientHeight);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 24, right: 18, bottom: 38, left: 56 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1);
    const roundedMax = Math.ceil(maxRevenue / 1000) * 1000 || 1000;

    ctx.font = "10px Manrope";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#7a8696";
    ctx.strokeStyle = "#e5eaf0";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i += 1) {
      const y = padding.top + (chartHeight / 4) * i;
      const value = roundedMax - (roundedMax / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(value >= 1000 ? `${Math.round(value / 1000)}k` : String(Math.round(value)), padding.left - 9, y);
    }

    if (!hasRevenue) return;

    const points = data.map((item, index) => ({
      x: padding.left + (data.length === 1 ? chartWidth / 2 : (chartWidth / (data.length - 1)) * index),
      y: padding.top + chartHeight - (item.revenue / roundedMax) * chartHeight,
      item
    }));

    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, "rgba(20, 199, 164, 0.30)");
    gradient.addColorStop(1, "rgba(20, 199, 164, 0.02)");
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points.at(-1).x, padding.top + chartHeight);
    ctx.lineTo(points[0].x, padding.top + chartHeight);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = state.settings.accentColor || "#14c7a4";
    ctx.lineWidth = 3;
    ctx.stroke();

    const labelEvery = days > 10 ? Math.ceil(days / 7) : 1;
    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = state.settings.accentColor || "#14c7a4";
      ctx.lineWidth = 2;
      ctx.stroke();
      if (index % labelEvery === 0 || index === points.length - 1) {
        ctx.fillStyle = "#7a8696";
        ctx.font = "10px Manrope";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(point.item.date), point.x, padding.top + chartHeight + 13);
      }
    });
  }

  function renderProductFilters() {
    const available = new Set(state.products.flatMap(productFeatureTags));
    const features = FEATURE_ORDER.filter((feature) => available.has(feature));
    elements.productCategoryFilter.innerHTML = `<option value="All">সব ফিচার</option>${features.map((feature) => `<option value="${escapeHTML(feature)}">${escapeHTML(feature)}</option>`).join("")}`;
    elements.productCategoryFilter.value = features.includes(state.productCategory) ? state.productCategory : "All";
  }

  function filteredProducts() {
    const query = state.productSearch.toLowerCase();
    return state.products.filter((product) => {
      const status = productInventoryStatus(product);
      const tags = productFeatureTags(product);
      const searchText = `${product.name} ${product.sku} ${product.slug} ${product.edition} ${product.color} ${tags.join(" ")} ${(product.bestFor || []).join(" ")}`.toLowerCase();
      return (!query || searchText.includes(query))
        && (state.productCategory === "All" || tags.includes(state.productCategory))
        && (state.productStatus === "All" || status === state.productStatus);
    }).sort((a, b) => Number(a.priority || 9999) - Number(b.priority || 9999));
  }


  function renderProducts() {
    renderProductFilters();
    const products = filteredProducts();
    const availableCount = products.filter((product) => product.available !== false && product.active !== false).length;
    elements.productTableSummary.textContent = `${products.length} of ${state.products.length} products · ${availableCount} taking orders`;
    elements.productTableBody.innerHTML = products.map((product) => {
      const status = productInventoryStatus(product);
      const profit = productProfit(product);
      const margin = productMargin(product);
      return `
        <tr data-product-id="${Number(product.id)}">
          <td>
            <div class="product-cell">
              <img src="${safeImage(product.image)}" alt="${escapeHTML(product.name)}">
              <div><strong>${escapeHTML(product.name)}</strong><span>${escapeHTML(product.sku)} · ${escapeHTML(product.slug)}</span><small>${(product.bestFor || []).map(escapeHTML).join(" · ") || "No best-for label"}</small></div>
            </div>
          </td>
          <td><strong>${escapeHTML(product.edition)}</strong><br><span class="muted-cell">${escapeHTML(product.color)} · ${escapeHTML(productFeatureTags(product).join(" / ") || "ফিচার সেট করা নেই")}</span></td>
          <td><strong>${money(product.price)}</strong><br><span class="muted-cell">Cost ${money(product.cost)} · Profit ${money(profit)} (${margin.toFixed(0)}%)</span></td>
          <td>
            <span class="status-pill ${product.available === false ? "status-unavailable" : "status-active"}">${product.available === false ? "সাময়িক বন্ধ" : "অর্ডার নেওয়া হচ্ছে"}</span>
          </td>
          <td><strong>#${Number(product.priority || 0)}</strong></td>
          <td><span class="status-pill status-${slugStatus(status)}">${escapeHTML(status)}</span></td>
          <td>
            <div class="action-row wrap-actions">
              <button class="icon-action" data-product-action="edit">Edit</button>
              <button class="icon-action" data-product-action="duplicate">Duplicate</button>
              <button class="icon-action" data-product-action="toggle">${product.active ? "Archive" : "Publish"}</button>
              <button class="icon-action delete" data-product-action="delete">Delete</button>
            </div>
          </td>
        </tr>`;
    }).join("");
    elements.productTableEmpty.classList.toggle("hidden", products.length > 0);
  }


  function openProductModal(product = null) {
    state.editingProductId = product ? Number(product.id) : null;
    elements.productModalTitle.textContent = product ? "Edit earphone" : "Add earphone";
    elements.productForm.reset();
    const form = elements.productForm.elements;
    const nextId = Store.generateId(state.products);
    const defaultImage = Store.productArtwork("New Earphone", "Earphone BD");
    form.id.value = product?.id || "";
    form.name.value = product?.name || "";
    form.sku.value = product?.sku || `EBD-${String(nextId).padStart(4, "0")}`;
    form.slug.value = product?.slug || "";
    form.edition.value = product?.edition || "সাধারণ এডিশন";
    form.color.value = product?.color || "কালো";
    form.priority.value = product?.priority ?? Math.max(1, state.products.length + 1);
    form.price.value = product?.price ?? "";
    form.oldPrice.value = product?.oldPrice || "";
    form.cost.value = product?.cost ?? "";
    form.stock.value = 999;
    form.reorderLevel.value = 0;
    if (form.available) form.available.value = String(product?.available !== false);
    form.warrantyDays.value = product?.warrantyDays ?? 7;
    form.supplier.value = product?.supplier || "";
    form.rating.value = product?.rating ?? 0;
    form.reviews.value = product?.reviews ?? 0;
    form.soldCount.value = product?.soldCount ?? 0;
    form.badge.value = product?.badge || "";
    const knownTags = product ? productFeatureTags(product) : [];
    elements.productForm.querySelectorAll('input[name="featureTag"]').forEach((input) => { input.checked = knownTags.includes(input.value); });
    const customTags = Array.isArray(product?.bestFor) ? product.bestFor.filter((tag) => !FEATURE_ORDER.includes(tag)) : [];
    form.bestFor.value = customTags.join(", ");
    form.active.value = String(product?.active !== false);
    form.image.value = product?.image || defaultImage;
    form.description.value = product?.description || "";
    form.features.value = Array.isArray(product?.features) ? product.features.join("\n") : "";
    form.customerReviews.value = Array.isArray(product?.customerReviews) ? product.customerReviews.map((review) => `${review.name || "ক্রেতা"} | ${review.text || ""}`).join("\n") : "";
    elements.productImagePreview.src = product?.image || defaultImage;
    updateProductProfitPreview();
    openModal(elements.productModal);
    window.setTimeout(() => form.name.focus(), 120);
  }


  function saveProductFromForm(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(elements.productForm).entries());
    const existing = state.products.find((product) => Number(product.id) === Number(data.id));
    const id = existing ? Number(existing.id) : Store.generateId(state.products);
    const product = Store.normalizeProduct({
      ...existing,
      ...data,
      id,
      priority: Number(data.priority),
      price: Number(data.price),
      oldPrice: Number(data.oldPrice) || 0,
      cost: Number(data.cost) || 0,
      stock: 999,
      reorderLevel: 0,
      available: data.available !== "false",
      warrantyDays: Number(data.warrantyDays) || 0,
      rating: Number(data.rating) || 0,
      reviews: Number(data.reviews) || 0,
      soldCount: Number(data.soldCount) || 0,
      active: data.active === "true",
      bestFor: [
        ...[...elements.productForm.querySelectorAll('input[name="featureTag"]:checked')].map((input) => input.value),
        ...String(data.bestFor || "").split(",").map((item) => item.trim()).filter(Boolean)
      ].filter((value, index, array) => array.indexOf(value) === index),
      category: "ইয়ারফোন",
      features: String(data.features || "").split("\n").map((item) => item.trim()).filter(Boolean),
      customerReviews: String(data.customerReviews || "").split("\n").map((line) => { const [name, ...parts] = line.split("|"); return { name: (name || "ক্রেতা").trim(), text: parts.join("|").trim() }; }).filter((review) => review.text),
      created: existing?.created || Date.now(),
      updatedAt: new Date().toISOString()
    });

    const duplicateSku = state.products.some((item) => item.sku.toLowerCase() === product.sku.toLowerCase() && Number(item.id) !== id);
    const duplicateSlug = state.products.some((item) => item.slug.toLowerCase() === product.slug.toLowerCase() && Number(item.id) !== id);
    if (duplicateSku || duplicateSlug) {
      showToast(duplicateSku ? "SKU already exists" : "Slug already exists", "Use a unique SKU and product slug.");
      return;
    }

    if (existing) state.products = state.products.map((item) => Number(item.id) === id ? product : item);
    else state.products.push(product);
    state.products = Store.saveProducts(state.products);
    closeModals();
    renderAll();
    showToast(existing ? "Product updated" : "Product created", `${product.name} · profit ${money(productProfit(product))} per unit`);
  }


  function compressProductImage(file, maxSize = 900, quality = 0.78) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("image/")) { reject(new Error("সঠিক ছবি নির্বাচন করুন।")); return; }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("ছবিটি পড়া যায়নি।"));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("ছবিটি খোলা যায়নি।"));
        image.onload = () => {
          const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
          const width = Math.max(1, Math.round(image.width * scale));
          const height = Math.max(1, Math.round(image.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, width, height);
          ctx.drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL("image/webp", quality));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function updateProductProfitPreview() {
    if (!elements.productProfitPreview) return;
    const price = Number(elements.productForm.elements.price.value || 0);
    const cost = Number(elements.productForm.elements.cost.value || 0);
    const profit = Math.max(0, price - cost);
    const margin = price > 0 ? (profit / price) * 100 : 0;
    elements.productProfitPreview.innerHTML = `<span>Profit preview</span><strong>${money(profit)} per unit</strong><small>${margin.toFixed(1)}% gross margin before discounts and delivery costs.</small>`;
  }

  function duplicateProduct(id) {
    const source = state.products.find((item) => Number(item.id) === Number(id));
    if (!source) return;
    const nextId = Store.generateId(state.products);
    const copy = Store.normalizeProduct({
      ...source,
      id: nextId,
      name: `${source.name} Copy`,
      sku: `${source.sku}-COPY-${nextId}`,
      slug: `${source.slug}-copy-${nextId}`,
      priority: Math.max(...state.products.map((item) => Number(item.priority || 0)), 0) + 1,
      active: false,
      created: Date.now(),
      updatedAt: new Date().toISOString()
    });
    state.products.push(copy);
    state.products = Store.saveProducts(state.products);
    renderAll();
    openProductModal(copy);
    showToast("Draft duplicated", "Review the copied product and save your changes.");
  }

  function adjustProductStock(id, amount) {
    state.products = state.products.map((product) => Number(product.id) === Number(id)
      ? { ...product, stock: Math.max(0, Number(product.stock || 0) + amount), updatedAt: new Date().toISOString() }
      : product);
    state.products = Store.saveProducts(state.products);
    renderAll();
  }

  function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"' && line[index + 1] === '"') { current += '"'; index += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === "," && !quoted) { cells.push(current.trim()); current = ""; }
      else current += char;
    }
    cells.push(current.trim());
    return cells;
  }

  function bulkRows() {
    return String(elements.bulkProductText.value || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(parseCsvLine);
  }

  function updateBulkPreview() {
    const rows = bulkRows();
    const valid = rows.filter((row) => row.length >= 8 && row[0] && Number(row[1]) >= 0);
    elements.bulkPreview.textContent = rows.length ? `${valid.length} valid row${valid.length === 1 ? "" : "s"} of ${rows.length} detected.` : "No rows detected yet.";
  }

  function importBulkProducts(event) {
    event.preventDefault();
    const rows = bulkRows();
    if (!rows.length) return;
    let created = 0;
    let updated = 0;
    let skipped = 0;
    rows.forEach((row) => {
      const [name, price, oldPrice, cost, edition, color, slug, priority, featureTags = "", available = "true"] = row;
      if (!name || !slug || Number.isNaN(Number(price))) { skipped += 1; return; }
      const existing = state.products.find((item) => item.slug.toLowerCase() === Store.slugify(slug).toLowerCase());
      if (existing && !elements.bulkReplaceExisting.checked) { skipped += 1; return; }
      const id = existing?.id || Store.generateId(state.products);
      const product = Store.normalizeProduct({
        ...existing,
        id,
        name,
        price: Number(price),
        oldPrice: Number(oldPrice) || 0,
        cost: Number(cost) || 0,
        edition: edition || "No Edition",
        color: color || "Not specified",
        slug,
        priority: Number(priority) || state.products.length + 1,
        category: "ইয়ারফোন",
        stock: 999,
        available: String(available).toLowerCase() !== "false",
        bestFor: String(featureTags).split(/[|,]/).map((item) => item.trim()).filter(Boolean),
        badge: String(featureTags).split(/[|,]/)[0] || existing?.badge || "",
        sku: existing?.sku || `EBD-${String(id).padStart(4, "0")}`,
        image: existing?.image || Store.productArtwork(name, `${edition || "No Edition"} · ${color || "Not specified"}`),
        description: existing?.description || `${name} available from Earphone BD.`,
        features: existing?.features || [],
        active: existing?.active !== false,
        created: existing?.created || Date.now(),
        updatedAt: new Date().toISOString()
      });
      if (existing) {
        state.products = state.products.map((item) => Number(item.id) === Number(existing.id) ? product : item);
        updated += 1;
      } else {
        state.products.push(product);
        created += 1;
      }
    });
    state.products = Store.saveProducts(state.products);
    elements.bulkProductForm.reset();
    updateBulkPreview();
    closeModals();
    renderAll();
    showToast("Bulk import complete", `${created} created · ${updated} updated · ${skipped} skipped`);
  }

  function toggleProduct(id) {
    state.products = state.products.map((product) => Number(product.id) === Number(id) ? { ...product, active: !product.active } : product);
    state.products = Store.saveProducts(state.products);
    renderAll();
    const product = state.products.find((item) => Number(item.id) === Number(id));
    showToast(product?.active ? "Product published" : "Product archived", product?.name || "Catalog updated");
  }

  function deleteProduct(id) {
    const product = state.products.find((item) => Number(item.id) === Number(id));
    if (!product) return;
    askConfirmation("Delete product?", `${product.name} will be permanently removed from the storefront catalog.`, () => {
      state.products = state.products.filter((item) => Number(item.id) !== Number(id));
      state.products = Store.saveProducts(state.products);
      renderAll();
      showToast("Product deleted", product.name);
    });
  }

  function filteredOrders() {
    const query = state.orderSearch.toLowerCase();
    return state.orders.filter((order) => {
      const customer = order.customer || {};
      const searchText = `${order.id} ${customer.name || ""} ${customer.phone || ""} ${customer.email || ""}`.toLowerCase();
      return (!query || searchText.includes(query))
        && (state.orderStatus === "All" || order.status === state.orderStatus)
        && (state.paymentStatus === "All" || order.paymentStatus === state.paymentStatus);
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderOrderStats() {
    const stats = [
      ["Pending", state.orders.filter((order) => order.status === "Pending").length],
      ["Processing", state.orders.filter((order) => ["Confirmed", "Processing"].includes(order.status)).length],
      ["Shipped", state.orders.filter((order) => order.status === "Shipped").length],
      ["Delivered", state.orders.filter((order) => order.status === "Delivered").length]
    ];
    elements.orderStats.innerHTML = stats.map(([label, value]) => `<article class="order-stat"><span>${label}</span><strong>${value}</strong></article>`).join("");
  }

  function renderOrders() {
    renderOrderStats();
    const orders = filteredOrders();
    elements.orderTableSummary.textContent = `${orders.length} of ${state.orders.length} orders`;
    elements.orderTableBody.innerHTML = orders.map((order) => {
      const customer = order.customer || {};
      return `
        <tr data-order-id="${escapeHTML(order.id)}">
          <td><strong>${escapeHTML(order.id)}</strong><br><span class="muted-cell">${getOrderItems(order).length} line item${getOrderItems(order).length === 1 ? "" : "s"}</span></td>
          <td><strong>${escapeHTML(customer.name || "Guest")}</strong><br><span class="muted-cell">${escapeHTML(customer.phone || customer.email || "No contact")}</span></td>
          <td>${formatDate(order.createdAt)}<br><span class="muted-cell">${formatDate(order.createdAt, true).split(",").at(-1)?.trim() || ""}</span></td>
          <td><span class="status-pill status-${slugStatus(order.paymentStatus)}">${escapeHTML(order.paymentStatus)}</span><br><span class="muted-cell">${escapeHTML(customer.payment || "Not specified")}</span></td>
          <td><span class="status-pill status-${slugStatus(order.status)}">${escapeHTML(order.status)}</span></td>
          <td><strong>${money(order.totals?.total)}</strong></td>
          <td><button class="icon-action" data-order-action="view">View order</button></td>
        </tr>`;
    }).join("");
    elements.orderTableEmpty.classList.toggle("hidden", orders.length > 0);
  }

  function openOrderModal(orderId) {
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return;
    state.openOrderId = order.id;
    const customer = order.customer || {};
    const items = getOrderItems(order);
    const profit = orderProfit(order);
    const whatsappNumber = String(customer.phone || "").replace(/\D/g, "").replace(/^0/, "88");
    elements.orderModalTitle.textContent = order.id;
    elements.orderModalBody.innerHTML = `
      <div class="order-detail-grid">
        <section class="order-info-card">
          <h3>Customer and delivery</h3>
          <div class="info-list">
            <div><span>Customer</span><strong>${escapeHTML(customer.name || "Guest")}</strong></div>
            <div><span>Phone</span><strong>${escapeHTML(customer.phone || "Not provided")}</strong></div>
            <div><span>জেলা</span><strong>${escapeHTML(customer.district || customer.city || "দেওয়া হয়নি")}</strong></div>
            <div><span>উপজেলা / থানা</span><strong>${escapeHTML(customer.upazila || customer.thana || "দেওয়া হয়নি")}</strong></div>
            <div><span>ঠিকানা</span><strong>${escapeHTML(customer.address || "দেওয়া হয়নি")}</strong></div>
            <div><span>Customer note</span><strong>${escapeHTML(customer.customerNote || "No note")}</strong></div>
          </div>
          ${whatsappNumber ? `<a class="secondary-button order-whatsapp" target="_blank" rel="noopener" href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${customer.name || ""}, this is Earphone BD regarding order ${order.id}.`)}">Message on WhatsApp</a>` : ""}
        </section>
        <section class="order-info-card">
          <h3>Order information</h3>
          <div class="info-list">
            <div><span>Placed</span><strong>${formatDate(order.createdAt, true)}</strong></div>
            <div><span>Payment method</span><strong>${escapeHTML(customer.payment || "Not specified")}</strong></div>
            <div><span>Payment status</span><strong>${escapeHTML(order.paymentStatus)}</strong></div>
            <div><span>Fulfillment</span><strong>${escapeHTML(order.status)}</strong></div>
            <div><span>Courier</span><strong>${escapeHTML(order.courier || "Not assigned")}</strong></div>
            <div><span>Tracking code</span><strong>${escapeHTML(order.trackingCode || "Not assigned")}</strong></div>
            <div><span>Ad source</span><strong>${escapeHTML(order.attribution?.lastTouch?.source || order.source || "direct")}</strong></div>
            <div><span>Campaign</span><strong>${escapeHTML(order.attribution?.lastTouch?.campaign || "Not available")}</strong></div>
            <div><span>Ad content</span><strong>${escapeHTML(order.attribution?.lastTouch?.content || "Not available")}</strong></div>
            <div><span>Facebook click ID</span><strong class="break-value">${escapeHTML(order.attribution?.lastTouch?.fbclid || "Not available")}</strong></div>
          </div>
        </section>
        <section class="order-info-card order-items-card">
          <h3>Items and profit</h3>
          ${items.map((item) => `
            <div class="order-line-item">
              <img src="${safeImage(item.image)}" alt="${escapeHTML(item.name)}">
              <div><strong>${escapeHTML(item.name)}</strong><span>${escapeHTML(item.edition)} · ${escapeHTML(item.color)} · ${escapeHTML(item.sku)} · Qty ${item.quantity}</span><small>Cost ${money(item.cost)} · Unit profit ${money(item.price - item.cost)}</small></div>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>`).join("") || `<div class="table-empty">No line items recorded.</div>`}
          <div class="order-total-list">
            <div><span>Subtotal</span><strong>${money(order.totals?.subtotal)}</strong></div>
            <div><span>Delivery</span><strong>${money(order.totals?.delivery)}</strong></div>
            <div><span>Discount</span><strong>− ${money(order.totals?.discount)}</strong></div>
            <div><span>Estimated gross profit</span><strong>${money(profit)}</strong></div>
            <div class="grand-total"><span>Total</span><strong>${money(order.totals?.total)}</strong></div>
          </div>
        </section>
        <section class="order-controls advanced-order-controls">
          <label><span>Fulfillment status</span><select id="modalOrderStatus">${ORDER_STATUSES.map((status) => `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
          <label><span>Payment status</span><select id="modalPaymentStatus">${PAYMENT_STATUSES.map((status) => `<option value="${status}" ${order.paymentStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
          <label><span>Courier service</span><input type="text" id="modalCourier" value="${escapeHTML(order.courier || "")}" placeholder="Pathao, Steadfast, RedX..."></label>
          <label><span>Tracking code</span><input type="text" id="modalTrackingCode" value="${escapeHTML(order.trackingCode || "")}" placeholder="Courier tracking ID"></label>
          <label class="span-two"><span>Internal order note</span><textarea id="modalOrderNotes" rows="3" placeholder="Only visible in admin">${escapeHTML(order.notes || "")}</textarea></label>
          <div class="action-row span-two">
            <button class="primary-button" id="saveOrderStatus">Save changes</button>
            <button class="danger-button" id="deleteOrderButton">Delete</button>
          </div>
        </section>
      </div>`;
    openModal(elements.orderModal);
  }


  function saveOrderStatus() {
    const order = state.orders.find((item) => item.id === state.openOrderId);
    if (!order) return;
    const previousStatus = order.status;
    const nextStatus = document.getElementById("modalOrderStatus").value;
    const changed = previousStatus !== nextStatus;
    order.status = nextStatus;
    order.paymentStatus = document.getElementById("modalPaymentStatus").value;
    order.courier = document.getElementById("modalCourier").value.trim();
    order.trackingCode = document.getElementById("modalTrackingCode").value.trim();
    order.notes = document.getElementById("modalOrderNotes").value.trim();
    order.updatedAt = new Date().toISOString();
    order.timeline = Array.isArray(order.timeline) ? order.timeline : [];
    if (changed) order.timeline.push({ status: nextStatus, at: order.updatedAt, note: order.notes || "Status changed by admin" });
    Store.saveOrders(state.orders);
    closeModals();
    renderAll();
    showToast("Order updated", order.id);
  }


  function deleteOrder(orderId) {
    const order = state.orders.find((item) => item.id === orderId);
    if (!order) return;
    askConfirmation("Delete order?", `${order.id} will be permanently removed from reporting and customer history.`, () => {
      state.orders = state.orders.filter((item) => item.id !== orderId);
      Store.saveOrders(state.orders);
      renderAll();
      showToast("Order deleted", order.id);
    });
  }

  function renderCustomers() {
    const customers = getCustomers();
    const query = state.customerSearch.toLowerCase();
    const filtered = customers.filter((customer) => `${customer.name} ${customer.phone} ${customer.district || customer.city || ""} ${customer.upazila || customer.thana || ""}`.toLowerCase().includes(query));
    const totalValue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    elements.customerCountMetric.textContent = customers.length;
    elements.repeatCustomerMetric.textContent = customers.filter((customer) => customer.orders > 1).length;
    elements.subscriberMetric.textContent = state.subscribers.length;
    elements.customerValueMetric.textContent = money(customers.length ? totalValue / customers.length : 0);
    elements.customerTableBody.innerHTML = filtered.map((customer) => {
      const initials = customer.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "GC";
      return `
        <tr>
          <td><div class="customer-cell"><span>${escapeHTML(initials)}</span><div><strong>${escapeHTML(customer.name)}</strong><small>${customer.orders > 1 ? "Repeat customer" : "Customer"}</small></div></div></td>
          <td><strong>${escapeHTML(customer.phone || "No phone")}</strong><br><span class="muted-cell">${escapeHTML(customer.email || "No email")}</span></td>
          <td>${escapeHTML(customer.city || "Not specified")}</td>
          <td><strong>${customer.orders}</strong></td>
          <td><strong>${money(customer.totalSpent)}</strong></td>
          <td>${formatDate(customer.lastOrder)}</td>
        </tr>`;
    }).join("");
    elements.customerTableEmpty.classList.toggle("hidden", filtered.length > 0);
  }

  function renderCoupons() {
    const entries = Object.entries(state.coupons).sort(([a], [b]) => a.localeCompare(b));
    elements.couponGrid.innerHTML = entries.map(([code, coupon]) => {
      const valueLabel = coupon.type === "percent" ? `${Number(coupon.value)}% OFF` : `${money(coupon.value)} OFF`;
      return `
        <article class="coupon-card ${coupon.active === false ? "inactive" : ""}" data-coupon-code="${escapeHTML(code)}">
          <div class="coupon-card-top">
            <span class="coupon-code">${escapeHTML(code)}</span>
            <span class="status-pill status-${coupon.active === false ? "draft" : "active"}">${coupon.active === false ? "Inactive" : "Active"}</span>
          </div>
          <h3>${escapeHTML(valueLabel)}</h3>
          <p>${escapeHTML(coupon.label || "Store discount")}</p>
          <div class="coupon-meta">
            <span>Minimum spend<strong>${money(coupon.minSpend || 0)}</strong></span>
            <span>Maximum discount<strong>${coupon.maxDiscount ? money(coupon.maxDiscount) : "No cap"}</strong></span>
          </div>
          <div class="coupon-actions">
            <button class="secondary-button" data-coupon-action="edit">Edit coupon</button>
            <button class="icon-action delete" data-coupon-action="delete">Delete</button>
          </div>
        </article>`;
    }).join("");
    elements.couponEmpty.classList.toggle("hidden", entries.length > 0);
  }

  function openCouponModal(code = null) {
    const coupon = code ? state.coupons[code] : null;
    state.editingCouponCode = code;
    elements.couponModalTitle.textContent = coupon ? "Edit coupon" : "Create coupon";
    elements.couponForm.reset();
    const form = elements.couponForm.elements;
    form.originalCode.value = code || "";
    form.code.value = code || "";
    form.type.value = coupon?.type || "percent";
    form.value.value = coupon?.value ?? 10;
    form.minSpend.value = coupon?.minSpend ?? 0;
    form.maxDiscount.value = coupon?.maxDiscount ?? 0;
    form.active.value = String(coupon?.active !== false);
    form.label.value = coupon?.label || "";
    openModal(elements.couponModal);
    window.setTimeout(() => form.code.focus(), 120);
  }

  function saveCouponFromForm(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(elements.couponForm).entries());
    const originalCode = data.originalCode;
    const code = String(data.code || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
    if (!code) {
      showToast("Invalid coupon code", "Use letters, numbers, underscores, or hyphens.");
      return;
    }
    if (code !== originalCode && state.coupons[code]) {
      showToast("Coupon already exists", "Choose a different code.");
      return;
    }
    if (originalCode && originalCode !== code) delete state.coupons[originalCode];
    state.coupons[code] = {
      type: data.type === "fixed" ? "fixed" : "percent",
      value: Math.max(0, Number(data.value) || 0),
      minSpend: Math.max(0, Number(data.minSpend) || 0),
      maxDiscount: Math.max(0, Number(data.maxDiscount) || 0),
      active: data.active === "true",
      label: String(data.label || "Store discount").trim()
    };
    Store.saveCoupons(state.coupons);
    closeModals();
    renderAll();
    showToast(originalCode ? "Coupon updated" : "Coupon created", code);
  }

  function deleteCoupon(code) {
    if (!state.coupons[code]) return;
    askConfirmation("Delete coupon?", `${code} will stop working immediately on the storefront.`, () => {
      delete state.coupons[code];
      Store.saveCoupons(state.coupons);
      renderAll();
      showToast("Coupon deleted", code);
    });
  }

  function populateSettingsForm() {
    const form = elements.settingsForm.elements;
    Object.entries(state.settings).forEach(([key, value]) => {
      if (form.namedItem(key)) form.namedItem(key).value = value;
    });
  }

  function saveSettings(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(elements.settingsForm).entries());
    state.settings = Store.saveSettings({
      ...data,
      freeShippingThreshold: Math.max(0, Number(data.freeShippingThreshold) || 0),
      deliveryFee: Math.max(0, Number(data.deliveryFee) || 0),
      insideDhakaDeliveryFee: Math.max(0, Number(data.insideDhakaDeliveryFee) || 0),
      outsideDhakaDeliveryFee: Math.max(0, Number(data.outsideDhakaDeliveryFee) || 0),
      lowStockThreshold: Math.max(0, Number(data.lowStockThreshold) || 0),
      currency: String(data.currency || "৳").trim(),
      orderPrefix: String(data.orderPrefix || "EBD").trim().toUpperCase(),
      accentColor: data.accentColor || "#0ea5e9"
    });
    document.documentElement.style.setProperty("--accent", state.settings.accentColor);
    renderAll();
    showToast("সেটিংস সেভ হয়েছে", "স্টোরফ্রন্টে নতুন সেটিংস ব্যবহার হবে।");
  }


  async function importLegacyBackupFile(file) {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.products && !data.orders) throw new Error("products বা orders পাওয়া যায়নি");
      const result = Store.importLegacyBackup(data, {
        importOrders: true,
        replaceOrders: Boolean(elements.replaceLegacyOrders?.checked)
      });
      refreshState();
      populateSettingsForm();
      renderAll();
      if (elements.legacyImportStatus) elements.legacyImportStatus.textContent = `${result.products}টি পণ্য এবং ${result.orders}টি পুরোনো অর্ডার পাওয়া গেছে। ইমপোর্ট সম্পন্ন হয়েছে।`;
      showToast("ব্যাকআপ ইমপোর্ট সম্পন্ন", `${result.products}টি পণ্য · ${result.orders}টি অর্ডার`);
    } catch (error) {
      console.error(error);
      if (elements.legacyImportStatus) elements.legacyImportStatus.textContent = `ইমপোর্ট ব্যর্থ: ${error.message || "ফাইলটি পরীক্ষা করুন"}`;
      showToast("ব্যাকআপ ইমপোর্ট হয়নি", error.message || "সঠিক JSON ফাইল দিন।");
    } finally {
      if (elements.legacyBackupInput) elements.legacyBackupInput.value = "";
    }
  }

  function exportAllData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: Store.CATALOG_VERSION || 1,
      products: state.products,
      orders: state.orders,
      coupons: state.coupons,
      settings: state.settings,
      subscribers: state.subscribers
    };
    downloadFile(`earphone-bd-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2));
    showToast("Backup downloaded", "Products, orders, coupons, settings, and subscribers were included.");
  }


  function exportOrdersCSV() {
    const header = ["Order ID", "Date", "Customer", "Phone", "District", "Upazila", "Address", "Payment Method", "Payment Status", "Order Status", "Courier", "Tracking", "Subtotal", "Delivery", "Discount", "Total", "Estimated Profit", "Source", "Medium", "Campaign", "Ad Content", "Term", "FBCLID", "Landing Page"];
    const rows = state.orders.map((order) => {
      const customer = order.customer || {};
      const attribution = order.attribution?.lastTouch || {};
      return [order.id, order.createdAt, customer.name, customer.phone, customer.district || "", customer.upazila || customer.thana || "", customer.address || "", customer.payment, order.paymentStatus, order.status, order.courier, order.trackingCode, order.totals?.subtotal, order.totals?.delivery, order.totals?.discount, order.totals?.total, orderProfit(order), attribution.source || order.source || "direct", attribution.medium || "", attribution.campaign || "", attribution.content || "", attribution.term || "", attribution.fbclid || "", attribution.landingPage || ""];
    });
    downloadFile(`earphone-bd-orders-${new Date().toISOString().slice(0, 10)}.csv`, [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }


  function exportProductsCSV() {
    const header = ["ID", "Priority", "Name", "SKU", "Slug", "Feature Tags", "Edition", "Color", "Selling Price", "Old Price", "Buying Cost", "Unit Profit", "Margin %", "Available", "Warranty Days", "Status"];
    const rows = [...state.products].sort((a, b) => Number(a.priority) - Number(b.priority)).map((product) => [
      product.id, product.priority, product.name, product.sku, product.slug, productFeatureTags(product).join(" | "), product.edition, product.color,
      product.price, product.oldPrice, product.cost, productProfit(product), productMargin(product).toFixed(2), product.available !== false ? "Yes" : "No",
      product.warrantyDays, product.active ? "Active" : "Draft"
    ]);
    downloadFile(`earphone-bd-products-${new Date().toISOString().slice(0, 10)}.csv`, [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }

  function exportCustomersCSV() {
    const header = ["Name", "Email", "Phone", "City", "Orders", "Total Spent", "Last Order"];
    const rows = getCustomers().map((customer) => [customer.name, customer.email, customer.phone, customer.city, customer.orders, customer.totalSpent, customer.lastOrder]);
    downloadFile(`earphone-bd-customers-${new Date().toISOString().slice(0, 10)}.csv`, [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
  }

  function resetStore() {
    askConfirmation("Reset Earphone BD data?", "Products, orders, coupons, settings, subscribers, cart, and wishlist will return to the supplied Earphone BD catalog.", () => {
      Store.resetStoreData();
      localStorage.removeItem(Store.STORAGE_KEYS.cart);
      localStorage.removeItem(Store.STORAGE_KEYS.wishlist);
      localStorage.removeItem(Store.STORAGE_KEYS.promo);
      refreshState();
      populateSettingsForm();
      renderAll();
      showToast("Store reset complete", "The 11-product Earphone BD catalog has been restored.");
    });
  }


  function renderAll() {
    renderNavigationCounts();
    renderDashboard();
    renderProducts();
    renderOrders();
    renderCustomers();
    renderCoupons();
    if (state.currentView === "settings") populateSettingsForm();
  }

  function handleGlobalSearch() {
    const query = elements.globalAdminSearch.value.trim();
    if (!query) return;
    const productMatch = state.products.some((product) => `${product.name} ${product.sku} ${product.slug} ${product.edition} ${product.color} ${productFeatureTags(product).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
    const orderMatch = state.orders.some((order) => `${order.id} ${order.customer?.name || ""} ${order.customer?.phone || ""}`.toLowerCase().includes(query.toLowerCase()));
    if (productMatch) {
      state.productSearch = query;
      elements.productSearch.value = query;
      renderProducts();
      switchView("products");
    } else if (orderMatch) {
      state.orderSearch = query;
      elements.orderSearch.value = query;
      renderOrders();
      switchView("orders");
    } else {
      showToast("No results found", `Nothing matched “${query}”.`);
    }
  }

  function showAdmin() {
    elements.loginScreen.classList.add("hidden");
    elements.adminShell.classList.remove("hidden");
    elements.topbarDate.textContent = new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date());
    refreshState();
    populateSettingsForm();
    renderAll();
    switchView(state.currentView);
  }

  function setupEvents() {
    elements.loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = elements.loginEmail.value.trim().toLowerCase();
      const password = elements.loginPassword.value;
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "active");
        elements.loginError.textContent = "";
        showAdmin();
      } else {
        elements.loginError.textContent = "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
      }
    });

    elements.togglePassword.addEventListener("click", () => {
      const hidden = elements.loginPassword.type === "password";
      elements.loginPassword.type = hidden ? "text" : "password";
      elements.togglePassword.textContent = hidden ? "লুকান" : "দেখুন";
    });

    elements.logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.reload();
    });

    elements.menuToggle.addEventListener("click", () => elements.sidebar.classList.add("open"));
    elements.sidebarClose.addEventListener("click", () => elements.sidebar.classList.remove("open"));

    document.querySelectorAll(".nav-item[data-view], [data-jump]").forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.view || button.dataset.jump));
    });

    elements.quickAddProduct.addEventListener("click", () => openProductModal());
    elements.addProductButton.addEventListener("click", () => openProductModal());
    elements.bulkImportButton.addEventListener("click", () => { elements.bulkProductForm.reset(); updateBulkPreview(); openModal(elements.bulkProductModal); });
    elements.exportProductsButton.addEventListener("click", exportProductsCSV);
    elements.addCouponButton.addEventListener("click", () => openCouponModal());
    elements.exportButton.addEventListener("click", exportAllData);
    elements.settingsExportButton.addEventListener("click", exportAllData);
    elements.exportOrdersButton.addEventListener("click", exportOrdersCSV);
    elements.exportCustomersButton.addEventListener("click", exportCustomersCSV);
    elements.resetStoreButton.addEventListener("click", resetStore);
    elements.importLegacyBackupButton?.addEventListener("click", () => elements.legacyBackupInput?.click());
    elements.legacyBackupInput?.addEventListener("change", () => importLegacyBackupFile(elements.legacyBackupInput.files?.[0]));

    elements.globalAdminSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleGlobalSearch();
    });

    elements.chartRange.addEventListener("change", renderSalesChart);
    window.addEventListener("resize", () => window.requestAnimationFrame(renderSalesChart));

    elements.productSearch.addEventListener("input", () => {
      state.productSearch = elements.productSearch.value.trim();
      renderProducts();
    });
    elements.productCategoryFilter.addEventListener("change", () => {
      state.productCategory = elements.productCategoryFilter.value;
      renderProducts();
    });
    elements.productStatusFilter.addEventListener("change", () => {
      state.productStatus = elements.productStatusFilter.value;
      renderProducts();
    });
    elements.resetProductFilters.addEventListener("click", () => {
      state.productSearch = "";
      state.productCategory = "All";
      state.productStatus = "All";
      elements.productSearch.value = "";
      elements.productStatusFilter.value = "All";
      renderProducts();
    });
    elements.bulkPublishButton.addEventListener("click", () => {
      const drafts = state.products.filter((product) => !product.active).length;
      if (!drafts) {
        showToast("No draft products", "Every product is already published.");
        return;
      }
      state.products = Store.saveProducts(state.products.map((product) => ({ ...product, active: true })));
      renderAll();
      showToast("All drafts published", `${drafts} product${drafts === 1 ? "" : "s"} are now visible.`);
    });

    elements.productTableBody.addEventListener("click", (event) => {
      const row = event.target.closest("[data-product-id]");
      const action = event.target.closest("[data-product-action]")?.dataset.productAction;
      if (!row || !action) return;
      const id = Number(row.dataset.productId);
      const product = state.products.find((item) => Number(item.id) === id);
      if (action === "edit") openProductModal(product);
      if (action === "duplicate") duplicateProduct(id);
      if (action === "stock-up") adjustProductStock(id, 1);
      if (action === "stock-down") adjustProductStock(id, -1);
      if (action === "toggle") toggleProduct(id);
      if (action === "delete") deleteProduct(id);
    });

    elements.productForm.addEventListener("submit", saveProductFromForm);
    elements.bulkProductForm.addEventListener("submit", importBulkProducts);
    elements.bulkProductText.addEventListener("input", updateBulkPreview);
    [elements.productForm.elements.price, elements.productForm.elements.cost].forEach((input) => input.addEventListener("input", updateProductProfitPreview));
    elements.productForm.elements.name.addEventListener("blur", () => {
      if (!elements.productForm.elements.slug.value.trim()) elements.productForm.elements.slug.value = Store.slugify(elements.productForm.elements.name.value);
    });
    elements.productForm.elements.image.addEventListener("input", () => {
      const value = elements.productForm.elements.image.value.trim();
      if (value) elements.productImagePreview.src = value;
    });
    elements.productImageFile?.addEventListener("change", async () => {
      const file = elements.productImageFile.files?.[0];
      if (!file) return;
      try {
        const compressed = await compressProductImage(file);
        elements.productForm.elements.image.value = compressed;
        elements.productImagePreview.src = compressed;
        showToast("ছবি প্রস্তুত", "ছবিটি ছোট করে পণ্যের সঙ্গে সংরক্ষণ করা হবে।");
      } catch (error) {
        showToast("ছবি যোগ করা যায়নি", error.message || "অন্য একটি ছবি চেষ্টা করুন।");
        elements.productImageFile.value = "";
      }
    });
    elements.productImagePreview.addEventListener("error", () => {
      elements.productImagePreview.src = Store.productArtwork("Earphone BD", "ছবি পাওয়া যায়নি");
    });

    elements.orderSearch.addEventListener("input", () => {
      state.orderSearch = elements.orderSearch.value.trim();
      renderOrders();
    });
    elements.orderStatusFilter.addEventListener("change", () => {
      state.orderStatus = elements.orderStatusFilter.value;
      renderOrders();
    });
    elements.paymentStatusFilter.addEventListener("change", () => {
      state.paymentStatus = elements.paymentStatusFilter.value;
      renderOrders();
    });
    elements.resetOrderFilters.addEventListener("click", () => {
      state.orderSearch = "";
      state.orderStatus = "All";
      state.paymentStatus = "All";
      elements.orderSearch.value = "";
      elements.orderStatusFilter.value = "All";
      elements.paymentStatusFilter.value = "All";
      renderOrders();
    });
    elements.orderTableBody.addEventListener("click", (event) => {
      const row = event.target.closest("[data-order-id]");
      if (row && event.target.closest("[data-order-action='view']")) openOrderModal(row.dataset.orderId);
    });
    elements.orderModalBody.addEventListener("click", (event) => {
      if (event.target.closest("#saveOrderStatus")) saveOrderStatus();
      if (event.target.closest("#deleteOrderButton")) {
        const id = state.openOrderId;
        closeModals();
        deleteOrder(id);
      }
    });

    elements.customerSearch.addEventListener("input", () => {
      state.customerSearch = elements.customerSearch.value.trim();
      renderCustomers();
    });

    elements.couponGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-coupon-code]");
      const action = event.target.closest("[data-coupon-action]")?.dataset.couponAction;
      if (!card || !action) return;
      const code = card.dataset.couponCode;
      if (action === "edit") openCouponModal(code);
      if (action === "delete") deleteCoupon(code);
    });
    elements.couponForm.addEventListener("submit", saveCouponFromForm);
    elements.settingsForm.addEventListener("submit", saveSettings);

    document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => closeModals()));
    elements.modalBackdrop.addEventListener("click", () => closeModals());
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModals();
    });

    elements.confirmCancel.addEventListener("click", () => {
      state.confirmCallback = null;
      closeModals();
    });
    elements.confirmProceed.addEventListener("click", () => {
      const callback = state.confirmCallback;
      state.confirmCallback = null;
      closeModals();
      if (callback) callback();
    });

    window.addEventListener("storage", (event) => {
      if (Object.values(Store.STORAGE_KEYS).includes(event.key)) {
        refreshState();
        renderAll();
        showToast("Store data refreshed", "A storefront or admin change was detected.");
      }
    });
  }

  function init() {
    setupEvents();
    if (sessionStorage.getItem(SESSION_KEY) === "active") showAdmin();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
