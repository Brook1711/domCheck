// Register a Page.

Page({
  data:{
    name:'wechat',
    checkBool: false,

    doorData:'0',
  },

  convert: function () {
    var openClose = [];
    var categories= [];

    var length = app.globalData.checkDoor.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.globalData.humidity.datapoints[i].at);
      openClose.push(app.globalData.humidity.datapoints[i].value);
    }
    console.log(categories)
    return {
      categories: categories,
      openClose: openClose,
      
      
    }
  },

  

  changeName: function ()
  {
    // sent data change to view
    var app=getApp()
    this.setData({ name: 'MINA' })
    this.setData({ doorData: app.globalData1.checkDoor.datapoints[0].at })
    
  },
  checkDoor:function()
  {
    this.setData({ checkBool:true})
  }
  ,
  
    getDataFromOneNet: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/23072249/datapoints?datastream_id=checkDoor&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'JzqKHWak0sjIQFA7KYMzXQaPGs0='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()

        app.globalData1.checkDoor = res.data.data.datastreams[0]
       
          console.log(res.data.data.datastreams[0])
        console.log(app.globalData1.checkDoor.datapoints[0].at)
       
        
   
     
     },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })


  },

})