Ext.define('Gl.controller.Setlapneraca', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Setlapneraca',
    requires: [
        'Gl.library.template.combobox.Projectptcomboboxv2'
    ],
    views: ['setlapneraca.Panel', 'setlapneraca.Grid', 'setlapneraca.FormSearch', 'setlapneraca.FormData'],
    stores: ['Setlapneraca','Projectptv2'],
    models: ['Setlapneraca','Projectpt'],
    refs: [
        {
            ref: 'grid',
            selector: 'setlapneracagrid'
        },
        {
            ref: 'formsearch',
            selector: 'setlapneracaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'setlapneracaformdata'
        }
    ],
    controllerName: 'setlapneraca',
    fieldName: 'coa',
    bindPrefixName:'Setlapneraca',
    init: function(application) {
        var me = this;
        this.control({
            'setlapneracapanel': {
                beforerender: me.mainPanelBeforeRender,
                 afterrender: function (panel) {
                    this.panelAfterRender()
                    panel.up('window').maximize();
                }
             
            },
            'setlapneracagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'setlapneracagrid toolbar button[action=generate]': {
                click: function () {
                     var grid,info,store,windows,from,until= '',fs;
                     fs = me.getFormsearch();

                    if (fs.down("[name=projectpt_id]").getValue() == "" || fs.down("[name=projectpt_id]").getValue() == null) {
                        me.buildWarningAlert("Please select project/pt field in form search");
                        return false;
                    }

                     from = Ext.getCmp('level_from').getValue();
                     until = Ext.getCmp('level_until').getValue();
                     project_id = fs.down("[name=project_id]").getValue();
                     pt_id = fs.down("[name=pt_id]").getValue();
                     if(until ==''){
                        this.buildWarningAlert('Sorry button generate not function <br/> because Until Level Cannot null');
                     }else{                    
                         grid = this.getGrid(); //get element
                         windows = grid.up('window'); //get windows element
                         windows.setLoading('Generate Data,Please Wait...'); //set loading
                        Ext.Ajax.request({
                            url: 'gl/setlapneraca/create',
                            method: 'POST',
                            params: {
                                data:  Ext.encode({
                                        "from":from,
                                        "until":until,
                                        "hideparam":'generate',
                                        "project_id":project_id,
                                        "pt_id": pt_id
                                })
                            },
                            success: function (response) {
                                info = Ext.JSON.decode(response.responseText);  
                                fs.down("[name=report_level]").setValue('');
				                me.dataSearch(); 				                          
                                windows.setLoading(false); //unset loading
                               // me.getStore('Setlapneraca');//mendapatkan store
                                //store.reload();
                            },
                            failure: function (response) {
                            }
                        });


                    }
                }
            },
            'setlapneracagrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'setlapneracagrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'setlapneracagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'setlapneracagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'setlapneracagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'setlapneracaformsearch': {
                afterrender: function () {
                    var me = this;
                    me.loaddataprojectpt();
                }
            },
            'setlapneracaformsearch [name=projectpt_id]': {
                change: function () {
                    var me = this;
                    var fs = me.getFormsearch();

                    var project_id = parseInt(apps.project);
                    var pt_id = parseInt(apps.pt);

                    if (fs.down("[name=projectpt_id]").valueModels[0] !== undefined) {
                        project_id = fs.down("[name=projectpt_id]").valueModels[0].data.project_id;
                        pt_id = fs.down("[name=projectpt_id]").valueModels[0].data.pt_id;
                    }

                    fs.down("[name=project_id]").setValue(project_id);
                    fs.down("[name=pt_id]").setValue(pt_id);
                }
            },
            'setlapneracaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'setlapneracaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'setlapneracaformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                    var me = this;
                    var fs = me.getFormsearch();
                    var fd = me.getFormdata();

                    if (fs.down("[name=projectpt_id]").getValue() == "" || fs.down("[name=projectpt_id]").getValue() == null) {
                        me.buildWarningAlert("Please select project/pt field in form search");
                        return false;
                    }   

                    fd.down("[name=project_id]").setValue(fs.down("[name=project_id]").getValue());
                    fd.down("[name=pt_id]").setValue(fs.down("[name=pt_id]").getValue());
                },
            },
            'setlapneracaformdata [name=coa]': {
                blur: function () {
                    this.dataExist('gl/setlapneraca/create', me, 'checkexist', 'flag');
                }
               
            },
            'setlapneracaformdata [name=flag]': {
                select: function () {
                    this.dataExist('gl/setlapneraca/create', me, 'checkexist', 'flag');
                }
               
            },
            'setlapneracaformdata button[action=save]': {
                click: this.dataSave

            },
            'setlapneracaformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    loaddataprojectpt: function () {
        var me = this;
        var fs = me.getFormsearch();

        var store = fs.down("[name=projectpt_id]").getStore();
        store.load({
            params: {
                user_id: apps.uid,
                hideparam: 'projectpt',
                project_id: parseInt(apps.project),
                pt_id: parseInt(apps.pt),
                page: 1,
                limit: 10000
            },
            callback: function (response) {
                fs.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
            }
        })
    },
    dataExist: function (url, controller, param, selector) {
        var statecheckdata, formvalue, info = '';
        var me = this;
        statecheckdata = controller.getFormdata().up('window').state.toLowerCase();
        if (statecheckdata == 'create') {
            controller.getFormdata().down("[name=hideparam]").setValue(param);
            formvalue = controller.getFormdata().getForm().getValues();
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                params: {data: Ext.encode(formvalue)},
                success: function (response) {
                    var info = '';
                    info = Ext.JSON.decode(response.responseText);
                    if (info.parameter == 'checkexist' && info.msg != null) {
                        me.buildWarningAlert(info.msg);
                    } 
                },
                failure: function (response) {

                }
            });

        }
    },
});