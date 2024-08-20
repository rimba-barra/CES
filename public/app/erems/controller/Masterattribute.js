Ext.define('Erems.controller.Masterattribute', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masterattribute',
    views: ['masterattribute.Panel', 'masterattribute.Grid', 'masterattribute.FormSearch', 'masterattribute.FormData', 'masterattribute.ValueGrid', 'masterattribute.FormAddValue'],
    stores: ['Masterattribute', 'Masterattributevalue', 'Atttype', 'Datatype'],
    models: ['Masterattribute', 'Masterattributevalue', 'Atttype', 'Datatype'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterattributegrid'
        },
        {
            ref: 'griddetail',
            selector: 'masterattributevaluegrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterattributeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterattributeformdata'
        }
    ],
    controllerName: 'masterattribute',
    fieldName: 'attribute',
    bindPrefixName: 'Masterattribute',
    init: function(application) {
        var me = this;
        this.control({
            'masterattributepanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender

            },
            'masterattributegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterattributegrid toolbar button[action=create]': {
                click: function() {
                    me.formDataShow('create');
                }
            },
            'masterattributegrid toolbar button[action=update]': {
                click: function() {
                    me.formDataShow('update');
                }
            },
            'masterattributegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterattributegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterattributegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterattributeformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'masterattributeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterattributeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterattributeformdata': {
                afterrender: this.formDataAfterRender,
                beforerender: function(el) {
                    el.down('#fd_masterattribute_atttype').getStore().load();
                }
            },
            'masterattributeformdata button[action=save]': {
                click: this.dataSave
            },
            'masterattributeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterattributeformdata button[action=value_add]': {
                click: function(el, act) {
                    me.formDataShow(el, act, 'value_add');
                }
            },
            'masterattributeformdata [name=is_freetext]': {
                change: function(el) {
                    me.freeTextOnSelect(el);
                }
            },
            'masterattributeformaddvalue': {
                afterrender: this.formDataAddValueAfterRender
            },
            'masterattributeformaddvalue button[action=save]': {
                click: function(f, a) {

                    me.formbuttonAction('addValue', f, a);
                }
            },
            'masterattributevaluegrid actioncolumn': {
                click: this.valuegridActionColumnClick
            }
            //




        });
    },
    freeTextOnSelect: function(el) {
        var me = this;
        var val = el.getValue();
        var fs = me.getFormdata().down("#MadetailFieldSet");
        var fa = me.getFormdata().down("[name=datatype]");
        if (!val) {
            fs.show();
            fa.hide();
        } else {
            fs.hide();
            fa.show();
        }
    },
    formSearchAfterRender: function(el) {
        var ftStore = el.down('#fs_masterattribute_atttype').getStore();
        ftStore.load();
    },
    formDataAfterRender: function(el) {
        var me = this;
        var vgrid = me.getFormdata().down('#valuemasterattribute_grid');
        var vstore = vgrid.getStore();
        vstore.loadData([], false);

        var valueStore = el.down('#valuemasterattribute_grid').getStore();

        if (el.up('window').state == 'create') {
            // el.down('#active').setValue(1);
        } else if (el.up('window').state == 'update') {
            var grid = me.getGrid();

            var store = grid.getStore();
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
            
            me.freeTextOnSelect(me.getFormdata().down("[name=is_freetext]"));
            valueStore.load(
                    {
                        params: {attribute_id: record.data.attribute_id}
                    }
                );
        }
    },
    formDataAddValueAfterRender: function(el) {
        var me = this;
        var grid = me.getFormdata().down('#valuemasterattribute_grid');
        var store = grid.getStore();
        el.down('#fav_attribute').setValue(me.getFormdata().down('#fdms_attribute').getValue());

        if (el.up('window').state == 'create') {
            // el.down('#active').setValue(1);
        } else if (el.up('window').state == 'update') {

            console.log(grid.getSelectionModel().getSelection()[0]);
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
            var form = el;
            // form.getForm().setValues({'image': record.data.image});
            // form.down('#fai_projectfacilities').setValue(record.data.projectfacilities);
            //form.down('#addImage_layermapimage').el.setStyle({backgroundImage: 'url(upload/' + record.data.image + ')', backgroundSize: '355px 200px'});
        }
    },
    valuegridActionColumnClick: function(view, cell, row, col, e) {
        var me = this;
        var grid = view.up('grid');
        var record = grid.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow(null, null, 'value_edit');

                    break;
                case 'destroy':
                    me.dataValueDestroy(grid);

                    break;
            }
        }
    },
    dataValueDestroy: function(grid) {
        var me = this;
        var rows = grid.getSelectionModel().getSelection();
        var valueData = null;
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = grid.getStore();
            valueData = store.getAt(store.indexOf(rows[0]));
            if (rows.length == 1) {
                var selectedRecord = '[' + valueData.get('attributevalue') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }
                    if (rows.length == 1) {
                        if (parseInt(valueData.get('attributevalue_id')) < 1) {
                            return;
                        }
                    }
                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            grid.up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            grid.up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    formbuttonControl: function(mode) {
        var myAction = {store: null, createProcess: null, updateProcess: null};
        var me = this;
        switch (mode) {
            case 'addValue':
                myAction.store = me.getMasterattributevalueStore(); /// set store here
                myAction.createProcess = function() {

                };
                myAction.updateProcess = function() {

                };
                break;
        }
        return myAction;
    },
    formDataShow: function(el, act, action) {
        var me = this;
        var state = "";
        if (action === me.bindPrefixName + 'Create') {
            state = 'create';
        } else if (action === me.bindPrefixName + 'Update') {
            state = "update";
        } else {
            state = action;
        }

        var formtitle, formicon;
        var mypanel = 'FormData';
        var winId = 'win-holidayformdata';
        var newState = state;
        switch (state) {
            case 'create':
                formtitle = 'Add New Master Attribute';
                formicon = 'icon-form-add';
                winId = 'win-holidayformdata';

                break;
            case 'update':
                formtitle = 'Edit Master Attribute';
                formicon = 'icon-form-edit';
                winId = 'win-holidayformdata';
                break;
            case 'value_add':
                formtitle = 'Marketing Attribute value';
                formicon = 'icon-form-add';
                mypanel = 'FormAddValue';
                winId = 'win-valueformdata';
                newState = 'create';
                break;
            case 'value_edit':
                formtitle = 'Marketing Attribute value';
                formicon = 'icon-form-edit';
                mypanel = 'FormAddValue';
                winId = 'win-valueformdata';
                newState = 'update';
                break;
        }
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 500,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + me.controllerName + '.' + mypanel),
                state: newState
            });
        }
        win.show();
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        if (form.isValid()) {
            resetTimer();
            var store = me.getGrid().getStore();
            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var formData = null;
            formData = form.getValues();

            var galleryStore = me.getFormdata().down('#valuemasterattribute_grid').getStore();
            var newArr = [];

            galleryStore.each(function(rec) {

                if (rec != null) {
                    if (parseInt(rec.data.attributevalue_id) == 0) {
                        newArr.push(rec.data);
                    }

                }

            });


            formData['detail'] = newArr;


            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':

                    store.add(formData);
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(formData);
                    rec.endEdit();
                    break;
                default:
                    return;
            }
            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    dataReset: function() {
        var me = this;
        me.getFormsearch().getForm().reset();
        me.getFormsearch().down('#fs_masterattribute_atttype').setValue('');
        me.dataSearch();
    }




});