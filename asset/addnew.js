var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlLoai = "http://localhost:3000/categories";
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["required"] });
}
class Check {
    constructor(t) {
        this.title = t;
    }
}
__decorate([
    Required
], Check.prototype, "title", void 0);
function validate(name, content) {
    const user = new Check(name);
    const invalidText = document.querySelector("#invalid");
    const validatorConfigs = registeredValidators.Check.title;
    for (const validatorConfig of validatorConfigs) {
        if (validatorConfig === "required") {
            if (!user.title) {
                invalidText.classList.remove("d-none");
                invalidText.insertAdjacentHTML("beforeend", content);
                return true;
            }
            else {
                invalidText.classList.add("d-none");
                return false;
            }
        }
    }
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield (yield fetch(urlLoai)).json();
        loadDataItem(categories);
        const btnAddNew = document.querySelector("#addnew");
        let img = document.querySelector("#img");
        let hinhAnh;
        img.addEventListener("input", (event) => {
            const e = event.target.files;
            hinhAnh = e[0].name;
        });
        btnAddNew === null || btnAddNew === void 0 ? void 0 : btnAddNew.addEventListener("click", (e) => {
            var _a, _b, _c;
            let name = document.querySelector('input[name="name"]');
            let price = document.querySelector('input[name="price"]');
            let sizeM = document.querySelector('input[name="sizeM"]');
            let sizeL = document.querySelector('input[name="sizeL"]');
            let sizeXL = document.querySelector('input[name="sizeXL"]');
            let idLoai = document.querySelector("#idLoai");
            let colors = document.querySelector("#colors");
            let date = document.querySelector('input[name="date"]');
            let flag = true;
            validate(name.value, "Trường <b>Name</b> không được bỏ trống<br>")
                ? (flag = false)
                : (flag = true);
            validate(price.value, "Trường <b>Price</b> không được bỏ trống<br>")
                ? (flag = false)
                : (flag = true);
            if (flag) {
                const data1 = {
                    name: name.value,
                    price: +price.value,
                    idLoai: +idLoai.value,
                    colors: [],
                    img: [],
                    size: {},
                };
                const dateNow = new Date();
                if (colors.value)
                    (_a = data1.colors) === null || _a === void 0 ? void 0 : _a.push(colors.value);
                if (hinhAnh)
                    (_b = data1.img) === null || _b === void 0 ? void 0 : _b.push(hinhAnh);
                else
                    (_c = data1.img) === null || _c === void 0 ? void 0 : _c.push(img.value);
                if (date.value) {
                    data1.date = date.value;
                }
                else {
                    data1.date = `${dateNow.getFullYear()}-${(+dateNow.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`;
                }
                const size = {
                    M: {
                        amount: +sizeM.value ? +sizeM.value : 0,
                        sold: 0,
                    },
                    L: {
                        amount: +sizeL.value ? +sizeL.value : 0,
                        sold: 0,
                    },
                    XL: {
                        amount: +sizeXL.value ? +sizeXL.value : 0,
                        sold: 0,
                    },
                };
                Object.assign(data1.size, size);
                handleUpdate(data1);
                location.assign("/admin/sanpham.html");
            }
        });
    });
}
function loadDataItem(categories) {
    const content = document.querySelector("#content");
    let imgString;
    let html;
    html = `<form name="fmk1">
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
        ${categories.map((el) => `<option value="${el.id}">${el.name}</option>`)}
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
        `;
    content.insertAdjacentHTML("beforeend", html);
}
function handleUpdate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("http://localhost:3000/products/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const result = yield res.json();
    });
}
loadData();
export {};
