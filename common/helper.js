import get from 'lodash.get'

export const filePreviewApi = ''

export const getDictLabel = (map = {}, type = "", id = "") => {
	if(id === null){
		return ""
	}
	if (map.hasOwnProperty(type)) {
		const items = map[type] || []
		return get(items.find(o => o.id === id),'label') || id 
	}
	return id
}
