import { method } from "../util";
class Product {
    checkProduct(product) {
        let result = {
            status: true,
            msg: '验证通过'
        }
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空'
            }
        }
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空'
            }
        }
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请输入正确的商品类别'
            }
        }
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格'
            }
        }
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品库存'
            }
        }
        if (typeof product.subImages !== 'string' || product.subImages.length === 0) {
            return {
                status: false,
                msg: '商品图片不能为空'
            }
        }
        if (typeof product.detail !== 'string' || product.detail.length === 0) {
            return {
                status: false,
                msg: '商品详情不能为空'
            }
        }
        return result
    }
    saveProduct(data) {
        return method.request({
            type: 'post',
            url: '/manage/product/save.do',
            data
        })
    }
    getProduct(data) {
        return method.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data
        })
    }
    /* 获取商品列表 */
    getProductList(type, data) {
        let url = type === 'list' ? '/manage/product/list.do' : '/manage/product/search.do'
        return method.request({
            type: 'post',
            url,
            data
        })
    }
    /* 变更商品销售状态 */
    setProductStatus(data) {
        return method.request({
            type: 'post',
            url: 'manage/product/set_sale_status.do',
            data
        })
    }
    getCategoryList(categoryId) {
        return method.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: categoryId || 0
            }
        })
    }
    updateCategoryName(categoryId) {
        return method.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: categoryId || 0
            }
        })
    }
    // 新增品类
    saveCategory(categoryId) {
        return method.request({
            type: 'post',
            url: '/manage/category/add_category.do',
            data: {
                categoryId: categoryId || 0
            }
        })
    }
}
export const product = new Product()