
// CONFIGURACIÓN
const CHECKOUT_URL = "https://pay.hotmart.com/H107828809M?checkoutMode=10";
const META_PIXEL_ID = "2040796516577567"; // rellenar cuando el dataset/pixel esté definido

const TRACK_PARAMS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid"];

function buildCheckoutUrl(){
  if (!CHECKOUT_URL || CHECKOUT_URL === "CHECKOUT_URL_HOTMART") return "#";
  const out = new URL(CHECKOUT_URL);
  const incoming = new URLSearchParams(window.location.search);
  TRACK_PARAMS.forEach(k => {
    const v = incoming.get(k);
    if (v) out.searchParams.set(k,v);
  });
  return out.toString();
}

document.querySelectorAll(".checkout-link").forEach(a => {
  a.addEventListener("click", (e) => {
    if (window.fbq) fbq("trackCustom", "ClickCheckout", {content_name:"50 Juegos Reducidos para Futsal"});
    const url = buildCheckoutUrl();
    if (url === "#") {
      e.preventDefault();
      alert("Checkout no disponible.");
      return;
    }
    a.href = url;
  });
});

function loadMetaPixel(){
  if (!META_PIXEL_ID) return;
  if (window.fbq) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
  fbq('track', 'ViewContent', {content_name:'50 Juegos Reducidos para Futsal'});
}

const banner = document.getElementById("cookie-banner");
const choice = localStorage.getItem("futsal_cookie_choice");
if (choice === "accepted") { banner.classList.add("hidden"); loadMetaPixel(); }
if (choice === "rejected") banner.classList.add("hidden");

document.getElementById("accept-cookies").onclick = () => {
  localStorage.setItem("futsal_cookie_choice","accepted");
  banner.classList.add("hidden");
  loadMetaPixel();
};
document.getElementById("reject-cookies").onclick = () => {
  localStorage.setItem("futsal_cookie_choice","rejected");
  banner.classList.add("hidden");
};
