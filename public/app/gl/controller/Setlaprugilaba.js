Ext.define('Gl.controller.Setlaprugilaba', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Setlaprugilaba',
    views: ['setlaprugilaba.Panel', 'setlaprugilaba.Grid', 'setlaprugilaba.FormSearch', 'setlaprugilaba.FormData'],
    stores: ['Setlaprugilaba'],
    models: ['Setlaprugilaba'],
    refs: [
        {
            ref: 'grid',
            selector: 'setlaprugilabagrid'
        },
        {
            ref: 'formsearch',
            selector: 'setlaprugilabaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'setlaprugilabaformdata'
        }
    ],
    controllerName: 'setlaprugilaba',
    fieldName: 'coa',
    bindPrefixName:'Setlaprugilaba',
    init: function(application) {
        var me = this;
        this.control({
            'setlaprugilabapanel': {
                beforerender: me.mainPanelBeforeRender,
                 afterrender: function (panel) {
                    this.panelAfterRender()
                    panel.up('window').maximize();
                }
             
            },
            'setlaprugilabagrid': {
                afterrender: function(){
                    me.gridAfterRender();
                    //me.getGrid().getView().scrollBy('bottom', 999999, true);
                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'setlaprugilabagrid toolbar button[action=generate]': {
                click: function () {
                     var grid,info,store,windows,from,until= '';
                     from = Ext.getCmp('level_from').getValue();
                     until = Ext.getCmp('level_until').getValue();
                     if(until ==''){
                        this.buildWarningAlert('Sorry button generate not function <br/> because Until Level Cannot null');
                     }else{                    
                         grid = this.getGrid(); //get element
                         windows = grid.up('window'); //get windows element
                         windows.setLoading('Generate Data,Please Wait...'); //set loading
                        Ext.Ajax.request({
                            url: 'gl/setlaprugilaba/create',
                            method: 'POST',
                            params: {
                                data:  Ext.encode({
                                        "from":from,
                                        "until":until,
                                        "hideparam":'generate',
                                })
                            },
                            success: function (response) {
                                info = Ext.JSON.decode(response.responseText);  
				me.dataReset(); 				                          
                                windows.setLoading(false); //unset loading
                               // me.getStore('Setlaprugilaba');//mendapatkan store
                                //store.reload();
                            },
                            failure: function (response) {
                            }
                        });


                    }
                }
            },
            'setlaprugilabagrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'setlaprugilabagrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'setlaprugilabagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'setlaprugilabagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'setlaprugilabagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'setlaprugilabaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'setlaprugilabaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'setlaprugilabaformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
            'setlaprugilabaformdata [name=coa]': {
                blur: function () {
                    this.dataExist('gl/setlaprugilaba/create', me, 'checkexist', 'flag');
                }
               
            },
            'setlaprugilabaformdata [name=flag]': {
                select: function () {
                    this.dataExist('gl/setlaprugilaba/create', me, 'checkexist', 'flag');
                }
               
            },
            'setlaprugilabaformdata button[action=save]': {
                click: this.dataSave

            },
            'setlaprugilabaformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    }
});