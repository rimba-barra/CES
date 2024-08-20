Ext.define('Erems.controller.Uploadcjp', {
    extend: 'Erems.library.template.controller.Controllermanual',
    alias: 'controller.Uploadcjp',
    views: [

    ],
    stores: [

    ],
    models: [

    ],
    refs: [
        {ref: 'grid', selector: 'uploadcjpgrid'},
        {ref: 'formsearch', selector: 'uploadcjpformsearch'},
        {ref: 'formdata', selector: 'uploadcjpformdata'},
    ],
    controllerName: 'uploadcjp',
    fieldName: 'uploadcjp',
    bindPrefixName: 'Uploadcjp',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'uploadcjppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(120);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(500);
                    me.panelAfterRender();
                }

            },
            'uploadcjpgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'uploadcjpgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'uploadcjpgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'uploadcjpgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'uploadcjpgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'uploadcjpgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'uploadcjpformsearch button[action=search]': {
                click: this.dataSearch
            },
            'uploadcjpformsearch button[action=reset]': {
                click: this.dataReset
            },
            'uploadcjpformdata': {
                afterrender: this.formDataAfterRender
            },
            'uploadcjpformdata button[action=submit]': {
                click: this.submitData
            },
            'uploadcjpformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    submitData: function () {
        var me, form, info,filedata,readeruploaddata,paramdata,typefile;
        me = this;
        form = me.getFormdata().getForm();
        if (form.isValid()) {
            filedata = me.getFormdata().down("[name=uploadfile_cjp]").getEl().down('input[type=file]').dom.files[0];
            readeruploaddata = new Ext.data.reader.Array(filedata);
            typefile =readeruploaddata['type']; 
            
            switch (typefile) {
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    //file xlsx
                    me.formSubmit();
                    break;
                case 'application/vnd.ms-excel':
                    //file xls
                    me.formSubmit();
                    break;
              default:
                    Ext.Msg.alert('WARNING', 'Only Excel file will be processed..!');
            }
        

        }
    }, 
    formSubmit:function(){
        var me, form, info,paramdata;
        me = this;
        form = me.getFormdata().getForm();        
        form.submit({
                url: 'erems/uploadcjp/create',
                params: {
                    'mode_read': 'upload',
                },
                waitMsg: 'Uploading your file, please wait...',
                success: function (fp, respon) {
                    info = respon.result;
                    if (info.success) {
                        Ext.Msg.alert('Success', info.msg); 
                        if(info.counternotvalid > 0){
                             Ext.Msg.alert('Data Upload Not Valid', info.msguploaderror);
                             window.open(info.directdata,'_blank');
                             //me.AjaxRequest({'filedata':info.filedata,'mode_read':'download'});
                        }
                        //me.formDataClose();
                    } else {
                        Ext.Msg.alert('Failure', info.msg);
                        //me.formDataClose();
                    }
                },
                failure: function (f, respon) {
                    Ext.Msg.alert('Failure', respon.result.msg);
                    me.formDataClose();
                }
            });
    },   
    AjaxRequest: function (param) {
        var me,info;
        me = this;
        Ext.Ajax.request({
            url: 'erems/uploadcjp/read',
            method: 'POST',
            params: {
                data: Ext.encode(param)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
            },
            failure: function (response) {
                me.formDataClose();
            }
        });
    },
});