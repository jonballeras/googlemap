import { getBigImgdata } from "../lib/getBigImgData.js";

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  
    );
  }

async function createScrollBar(target,staticImgUrl) {
    const scrollbarWraper = document.querySelector(".scroll-fake");
    const propertiesWraper = document.querySelector(".info");
    const filterElement = propertiesWraper.querySelector(".filter--wrapper");
    var scrollbar = document.createElement("input");
    const scrollinnerHeight = target.scrollHeight;
    const propertiesWraperHeight = propertiesWraper.clientHeight;
    const filterheight = filterElement.clientHeight;
    const totalscroll = ( scrollinnerHeight-propertiesWraperHeight ) + filterheight;
    Object.assign(scrollbar, {
        id: 'scrollbar-miror',
        className: "scrollbar",
        type: 'range',
        min: 0,
        max:totalscroll,
        style:`width:${propertiesWraperHeight-filterheight}px;`,
        oninput: function () {
        propertiesWraper.scrollTop = this.value
        },
    })

    scrollbarWraper.appendChild(scrollbar)
    propertiesWraper.addEventListener("scroll", async function() {
        scrollbar.value = this.scrollTop;
        const propItem = propertiesWraper.querySelectorAll(".prop-list-wrap")
        for(let i = 0; i < propItem.length; i++ ) {
            const propOnView = isInViewport(propItem[i]);
            const imgLoaded = propItem[i].getAttribute("img")
            if(!imgLoaded && propOnView) {
                const id = propItem[i].getAttribute("id")
                const imgData = await getBigImgdata(id,staticImgUrl)
                const imgWrap = propItem[i].querySelector(".img-wrap img")
                imgWrap.setAttribute("src", imgData)
                propItem[i].setAttribute("img", true)
            }
        }
    });
}

export { createScrollBar }