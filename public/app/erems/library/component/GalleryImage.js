Ext.define('Erems.library.component.GalleryImage', {
    extend: 'Ext.panel.Panel',
 //   alias: 'widget.galleryimagepanel',
    requires: ['Erems.library.Config'],
  //  itemId: 'GalleryImagePanel',
    controllerName:null,
    dataGallery:[],
    currentImage:1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {xtype: 'panel',
                    itemId: 'gipanel',
                    height: 400,
                    tpl: '<div style="margin:5px;"><div style="overflow:scroll;width:400px;height:300px;border:1px solid #D6DBE1;"><img src="{url}" /></div><p style="margin:5px 0;"><b>{title}</b></p><p style="overflow:scroll;width:400px;height:83px;" >{description}</p></div>'}
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    height: 28,
                    items: [
                        {
                            xtype: 'button',
                            action: 'prevprev',
                            margin: '0 5 0 0',
                            text: '<<',
                            listeners:{
                                click:function(){
                                    me.changeImage('prevprev');
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            action: 'prev',
                            margin: '0 5 0 0',
                            text: '<',
                            listeners:{
                                click:function(){
                                    me.changeImage('prev');
                                }
                            }
                        }, {
                            xtype: 'button',
                            action: 'next',
                            margin: '0 5 0 0',
                            text: '>',
                            listeners:{
                                click:function(){
                                    me.changeImage('next');
                                }
                            }
                        }, {
                            xtype: 'button',
                            action: 'nextnext',
                            margin: '0 5 0 0',
                            text: '>>',
                            listeners:{
                                click:function(){
                                    me.changeImage('nextnext');
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            action: 'close',
                            margin: '0 5 0 0',
                            text: 'close',
                            listeners:{
                                click:function(){
                                    me.up('window').close();
                                }
                            }
                        }
                    ]
                }

            ]

        });

        me.callParent(arguments);
    },
    beforeRenderCustom: function() {
        var me = this;
        me.updateGiPanel(1);
    },
    changeImage:function(mode){
        var me = this;
        var pos = 1;
        switch(mode){
            case 'prevprev':
                pos = 1;
                break;
           case 'prev':
               pos = me.currentImage-1; 
                pos = me.currentImage==1?1:(me.currentImage-1); 
                break;
           case 'next':
               pos = me.currentImage==me.dataGallery.length?me.dataGallery.length:(me.currentImage+1);
                break;
           case 'nextnext':
                 pos = me.dataGallery.length;
                break;
        }
        me.updateGiPanel(pos);
    },
    updateGiPanel:function(position){
        
        var me = this;
        if(me.dataGallery.length < 1){
            return false;
        }
        var config = new Erems.library.Config();
        me.currentImage = position;
        me.down('#gipanel').update({
            url:''+config.getImageFolder(me.controllerName)+''+me.dataGallery[me.currentImage-1].url,
            title:me.dataGallery[me.currentImage-1].title,
            description:me.dataGallery[me.currentImage-1].description
        });
    }

});