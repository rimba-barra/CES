Ext.define('Cashier.controller.Masterwhatsnew', {
    extend: 'Main.library.Controller',
    
	alias: 'controller.Masterwhatsnew',
	
	models: [
        'Masterwhatsnew'
    ],
    stores: [
        'Masterwhatsnew'
    ],
    views: [
        'masterwhatsnew.Panel',
        'masterwhatsnew.PanelFrame',
		'masterwhatsnew.FormSearch',
		'masterwhatsnew.Grid',
		'masterwhatsnew.FormData'
    ],
    refs: [
        {
            ref: 'paneldataframe',
            selector: 'masterwhatsnewpanelframe'
        },
        {
            ref: 'formdata',
            selector: 'masterwhatsnewformdata'
        }
    ],
    imageFolder: 'app/cashier/uploads/whatsnew/',
    init: function() {
        var me = this;

        me.control(me.mainPanel, {
            afterrender: me.mainPanelAfterRender
        });

        me.control(me.mainFormData, {
            afterrender: me.mainFormDataAfterRender
        });

        me.control(me.mainPanel+' [name=btnView]', {
             click: function(event) {
                 me.showPanelFrame();
             }
        });
        me.control(me.mainFormData+' [name=image-upload]', {
             change: function(event) {
                 me.uploadImage();
             }
        });
        me.control(me.mainFormData+' [name=btnUpload]', {
             click: function(event) {
                 me.uploadImage();
             }
        });

        me.control(me.mainPanel+'Frame', {
            afterrender: me.mainPanelFrameAfterRender
        });
        
        me.callParent(arguments);
    },
    showPanelFrame: function(){
        $.ajax({
            type: "POST",
            url: 'main/popup/read',
            data: {},
            dataType: 'json',
            success: function (response)
            {
                var result, total, data, user_id;
                total = response.total;
                data = response.data;
                user_id = response.user_id;
                if (total > 0) {
                    $.each(data, function (index, value) {
                        openPage({
                            itemId: value.widget,
                            id: value.widget,
                            title: value.popupname,
                            controller: value.controller,
                            widget: value.widget,
                            content: Ext.create(value.widget),
                        });
                    });
                }
            }
        });
    },
    mainPanelFrameAfterRender: function(){
        var me = this;
        // console.log(apps);
        var runningText = '';

        /* Ext.Ajax.request({
            url: 'cashier/masterwhatsnew/read',
            method: 'POST',
            timeout:100000000,  
            params: {
                datasearch: Ext.encode({
                    project_id: apps.project,
                    pt_id: apps.pt,
                    user_id: apps.uid,
                    hideparam: 'cashbon_late'
                })
            },
            success: function (response) {
                var data = response.responseText;
                var obj = JSON.parse(data);
                if (obj.success == 1) {
                    runningText = obj.data;
                }else{
                    runningText = '';
                }
            }
        }); */

        me.senddata = {
            active:1,
            app_name: apps.appId,
            subholding_id: apps.subholdingId
        }
        Ext.Ajax.request({
            url: 'cashier/masterwhatsnew/read',
            method: 'POST',
            timeout:100000000,  
            params: {
                datasearch: Ext.encode(me.senddata)
                //app_name: apps.appId
            },
            success: function (response) {
                var data = response.responseText;
                var obj = JSON.parse(data);
                var objdata = obj.data;
                var html = '';

                html=html +'<style>';
                html=html +'.panel-heading{ padding: 10px; padding-left: 0px; border-bottom: 1px solid #ccc;} ';
                html=html +'</style>';

                html = html + '<img style="width:100%;height:200px;" src="app/main/images/whatsnewheader.png"><br><br>';

                html = html + "<i style='color:red'>* Klik Judul Untuk Membaca What's New</i><br><br>";

                html = html + '<span><marquee direction="left" scrollamount="5" onMouseOver="this.stop()" onMouseOut="this.start()">'+runningText+'</marquee></span><br><br>';

                html = html + '<div class="panel-group" id="accordion">';
                html = html + '';

                for (var i = 0; i < objdata.length; i++){
                    var obj = objdata[i];

                    html = html + '<div class="panel panel-default"><div class="panel-heading"><a data-toggle="collapse" data-parent="#accordion" href="#collapse'+(i+1)+'"><h2 style="font-size:15px;" class="panel-title x-window-header-text-default">'+obj.title+'</h2><h3 style="text-align:right;"><i>'+obj.addon+'</i></h3> </a></div>';
                    html = html + '<div id="collapse'+(i+1)+'" class="panel-collapse collapse">';
                    if(obj.image!==null){
                        if(obj.image!==""){
                            html = html + '<br><img src="'+me.imageFolder+obj.image+'" style="width:100%;" /><br><br>';
                        }
                    }
                    html = html + '<p>'+obj.description+'</p><hr></div></div>';
                    html = html + '';
                }

                html = html + '</div>';
                $('#MasterwhatsnewIFrame').html(html);
            },
            failure: function (response) {
                me.getPaneldataframe().up('window').close();
            }
        });
    },
    mainFormDataAfterRender: function(){
        var me = this;
        var form = me.getMainFormData();
        setTimeout(function() {
            var image_filename = form.down("[name=image]").getValue();
             if(image_filename!==null){
                if(image_filename!==""){
                   $("#image-preview-content").attr('src', me.imageFolder+image_filename);
                }
            }
            
        }, 1000);
    },
    uploadImage: function(){
        var temp_id_detail = 0;
        var me = this;
        var form = me.getMainFormData();
        form.submit({
            url: 'cashier/masterwhatsnew/create',
            waitMsg: 'Uploading image...',
            type: 'upload',
            success: function (f, a) {
                var val = {
                    image_filename: a.result.imageName,
                    temp_id_images: temp_id_detail
                };

                $("#image-preview-content").attr('src', me.imageFolder+val.image_filename);
                form.down("[name=image]").setValue(val.image_filename);
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Image Uploaded',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });

            },
            failure: function (f, a) {
                Ext.Msg.show({
                    title: 'Upload Failed / Please fill the mandatory fields',
                    msg: 'Failed',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
});