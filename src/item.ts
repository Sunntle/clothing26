import { LoaiType, MenuLv2 } from "./allProduct"
import { ProductType, ProductType2 } from "./index"
const link = window.location.search
const urlProduct = link.slice(1)
const url = `http://localhost:3000/products/${urlProduct}`
const urlLoai = 'http://localhost:3000/categories';
interface sizeType{
    [key: string]: {
      amount: number;
      sold: number;
    };
}
interface DataType {
    name: string,
    price: number,
    idLoai: number,
    img?: string[],
    colors?: string[],
    date?: string,
    size?: sizeType
}

async function loadItem() {
    const data: ProductType2 = await (await fetch(url)).json()
    const categories: LoaiType[] = await (await fetch(urlLoai)).json()
    loadDataItem()
    function loadDataItem() {
        const chiTietSp = document.querySelector('#chitietsanpham') as HTMLElement
        let imgString: string
        let html: string
        html =
            `<form name="fmk1">
                <div class="form-floating mb-3">
            <input type="text" name="name" class="form-control" value="${data.name}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Tên sản phẩm</label>
            </div>
            <div class="form-floating mb-3">
            <input type="text" name="price" class="form-control" value="${data.price}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Giá</label>
            </div>
            <p><span class="fw-bolder">Hình ảnh: </span>
            ${data.img.map((el, index) => imgString = `<p><span style="width:200px">${el}</span>: <img class="img-fluid bg-transparent px-3"  style="max-width: 100px" src="../asset/img/${el}"><button type="button" class="btn-close" id="btnClose" data-value="${index}" aria-label="Close"></button></p>`).join('')}
            </p> 
            <div class="mb-3">
                <input class="form-control" type="file" id="img">
            </div>
            <p><span class="fw-bolder">Loại:</span>
            <select class="form-select" aria-label="Default select example" id="idLoai">
            ${categories.map(el => `<option value="${el.id}" ${el.id === data.idLoai ? `selected` : ''}>${el.name}</option>`)}
            </select></p>
            <p><span class="fw-bolder">Màu sắc: </span>
            ${data.colors.map(el => el)}
            </p>
            <div class="mb-3">
                <input class="form-control" type="text" id="colors">
            </div>
            <div class="form-floating mb-3">
            <input type="date" name="date" class="form-control" value="${data.date}" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Ngày nhập</label>
            </div>
            <a class="btn btn-primary" id="update">Cập nhật</a>
                </form>
            `
        chiTietSp.insertAdjacentHTML('beforeend', html)
    }
    const btnCloseAll: NodeListOf<Element> = document.querySelectorAll('.btn-close')
    const btnUpdate = document.querySelector('#update') as HTMLElement
    btnCloseAll.forEach(btnClose => {
        btnClose.addEventListener('click', e => {
            const event = e.target as HTMLElement | null
            const indexImg = event?.getAttribute('data-value')
            if (indexImg) {
                data?.img.splice(+indexImg, 1)
            }
            handleUpdate(getForm())
        })
    })
    btnUpdate?.addEventListener('click', e => {
        handleUpdate(getForm())
        getForm()
    })
    let img = document.querySelector('#img') as HTMLInputElement
    let hinhAnh:string
        img.addEventListener("input", (event) => {
            const e = (event.target as HTMLInputElement).files 
            hinhAnh = e![0].name
        })
    function getForm() {
        let name = document.querySelector('input[name="name"]') as HTMLInputElement
        let price = document.querySelector('input[name="price"]') as HTMLInputElement
        
        let idLoai = document.querySelector('#idLoai') as HTMLInputElement
        let colors = document.querySelector('#colors') as HTMLInputElement
        let date = document.querySelector('input[name="date"]') as HTMLInputElement
        const data1: DataType = {
            name: name.value,
            price: +price.value,
            idLoai: +idLoai.value,
            colors: [],
            img: [],
            size:{}
        }
        
        if (hinhAnh) data.img?.push(hinhAnh); else if(img.value) data.img?.push(img.value.toString())
        data1.img = [...data.img]
        if (colors.value) data.colors?.push(colors.value.toString())
        data1.colors = [...data.colors]
        if (date.value) data1.date = date.value.toString()
        data1.size = { ...data.size }
        return data1
    }
}

async function handleUpdate(data: DataType) {
    const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    const result = await res.json();
}
loadItem()
export {DataType,sizeType}
