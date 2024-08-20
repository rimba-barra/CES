Ext.define('Erems.view.masterwhatsnew.PanelFrame', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MasterwhatsnewPanelFrame',   
    itemId: 'MasterwhatsnewPanelFrame',
    height:500,
    layout:'fit',
    frame: true,
    autoScroll: true,
    imageFolder: 'app/cashier/uploads/whatsnew/', //tidak perlu diubah
    initComponent: function() {
        var me = this;
        var div = '<div id="MasterwhatsnewIFrame" style="overflow-y: scroll; padding: 20px; width:100%; height:100%;"><b>Loading . . . </b></div>';
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'panel',
                    autoScroll: true,
                    itemId:'MyFramePanel',
                    html: div,
                    width:'100%',
                    listeners: {
                        afterrender: function(){
                            me.mainPanelFrameAfterRender()
                        },
                    },
                    height:'100%'
                }
            ]
        });

        me.callParent(arguments);
    },
    mainPanelFrameAfterRender: function(){
        var me = this;

        me.senddata = {
            active:1,
            app_name: apps.appId,
            subholding_id: apps.subholdingId
        }
        Ext.Ajax.request({
            url: 'erems/masterwhatsnew/read',
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

});