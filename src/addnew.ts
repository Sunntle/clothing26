import { LoaiType, MenuLv2 } from "./allProduct"
import { ProductType, ProductType2 } from "./index"
import { DataType } from "./item";
const urlLoai = 'http://localhost:3000/categories';
interface sizeType{
    amount: number,
    sold:number
}
interface ValidatorConfig {
    [property: string]:{
        [validatableProp:string] : string[]
    }
}
const registeredValidators: ValidatorConfig = {}
function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], [propName]: ['required']
    };
}
class Check{
    @Required
    title:string
    constructor(t:string){
        this.title = t
    }
}
function validate(name:string,content:string){
    const user = new Check(name)
    const invalidText =  document.querySelector('#invalid') as HTMLElement
    const validatorConfigs = registeredValidators.Check.title
    for (const validatorConfig of validatorConfigs) {
        if(validatorConfig  === "required"){
            if(!user.title) {
                invalidText.classList.remove('d-none')
                invalidText.insertAdjacentHTML('beforeend',content)
                return true
            }else{
                invalidText.classList.add('d-none')
                return false
            }
        }
    }
}
async function loadData() {
    const categories: LoaiType[] = await (await fetch(urlLoai)).json()
    loadDataItem(categories)
    const btnAddNew = document.querySelector('#addnew') as HTMLElement
    let img = document.querySelector('#img') as HTMLInputElement
    let hinhAnh:string
    img.addEventListener("input", (event) => {
        const e = (event.target as HTMLInputElement).files 
        hinhAnh = e![0].name
    })
    btnAddNew?.addEventListener('click',e=>{
        let name = document.querySelector('input[name="name"]') as HTMLInputElement
        let price = document.querySelector('input[name="price"]') as HTMLInputElement
        let sizeM = document.querySelector('input[name="sizeM"]') as HTMLInputElement
        let sizeL = document.querySelector('input[name="sizeL"]') as HTMLInputElement
        let sizeXL = document.querySelector('input[name="sizeXL"]') as HTMLInputElement
        let idLoai = document.querySelector('#idLoai') as HTMLInputElement
        let colors = document.querySelector('#colors') as HTMLInputElement
        let date = document.querySelector('input[name="date"]') as HTMLInputElement
        let flag = true
        validate(name.value,'Trường <b>Name</b> không được bỏ trống<br>') ?  flag = false :  flag = true
        validate(price.value,'Trường <b>Price</b> không được bỏ trống<br>') ?  flag = false :  flag = true
        if(flag){
            const data1: DataType = {
                name: name.value,
                price: +price.value,
                idLoai: +idLoai.value,
                colors: [],
                img: [],
                size: {}
            }
            const dateNow = new Date()
            if(colors.value) data1.colors?.push(colors.value)
            if(hinhAnh) data1.img?.push(hinhAnh); else data1.img?.push(img.value)
            if(date.value) {data1.date = date.value} else {data1.date = `${dateNow.getFullYear()}-${(+(dateNow.getMonth()) + 1).toString().padStart(2, '0')}-${dateNow.getDate().toString().padStart(2, '0')}`}
            const size ={
                M:{
                    amount: (+sizeM.value? +sizeM.value : 0),
                    sold: 0
                },
                L:{
                    amount: (+sizeL.value? +sizeL.value : 0),
                    sold: 0
                },
                XL:{
                    amount: (+sizeXL.value? +sizeXL.value : 0),
                    sold: 0
                }
            }
            Object.assign(data1.size! , size)
            handleUpdate(data1)
            location.assign('/admin/sanpham.html')
        }
        
    });
    
}
function loadDataItem(categories: LoaiType[]) {
    const content = document.querySelector('#content') as HTMLElement
    let imgString: string
    let html: string
    html =
        `<form name="fmk1">
            <div class="form-floating mb-3">
        <input type="text" name="name" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Tên sản phẩm</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" name="price" class="form-control"  id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Giá</label>
        </div>
        <p><span class="fw-bolder">Hình ảnh: </span>
        </p> 
        <div class="mb-3">
            <input class="form-control" type="file" id="img">
        </div>
        <p><span class="fw-bolder">Loại:</span>
        <select class="form-select" aria-label="Default select example" id="idLoai">
        ${categories.map(el => `<option value="${el.id}">${el.name}</option>`)}
        </select></p>
        <p><span class="fw-bolder">Màu sắc: </span>
        </p>
        <div class="mb-3">
            <input class="form-control" type="text" id="colors">
        </div>
        <p><span class="fw-bolder">Size: </span>
        </p>
        <div class="form-floating mb-3">
        <input type="text" name="sizeM" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">M</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" name="sizeL" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">L</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" name="sizeXL" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">XL</label>
        </div>
        <div class="form-floating mb-3">
        <input type="date" name="date" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Ngày nhập</label>
        </div>
        <div id="invalid" class="text-danger d-none my-2">
        
        </div>
        <a class="btn btn-primary" id="addnew">Thêm mới</a>
        
            </form>
        `
    content.insertAdjacentHTML('beforeend', html)
}
async function handleUpdate(data: DataType) {
    const res = await fetch('http://localhost:3000/products/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    const result = await res.json();
}
loadData()