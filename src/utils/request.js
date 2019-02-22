
function requst(url, method, data) {
  return new Promise((resolve, rejects) => {
    wx.request({
      url,
      method,
      data,
      success: res => {
        resolve(res);
      }
    })
  })
}

export default requst