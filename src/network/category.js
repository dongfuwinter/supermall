import {request2} from "@/network/request";

export function getCategory() {
  return request2({
    url: 'api/m5/category'
  })
}

export function getSubCategory(maitKey) {
  return request2({
    url: 'api/m5/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request2({
    url: 'api/m5/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}

