import { getBigImgdata } from "./getBigImgData";

export function loadBigImg() {
    const propList = document.querySelectorAll('.prop-list-wrap');
    const staticImgUrl = "https://cdn.jsdelivr.net/gh/rizalhasbianto/googlemapfilemaker@main/img/";

    for( let i = 0; i < 6; i++) {
        const id = propList[i].getAttribute("id");
        const imgData = getBigImgdata(id,staticImgUrl)
        const imgWrap = propList[i].querySelector(".img-wrap img")
        imgWrap.setAttribute("src", imgData)
    }
}