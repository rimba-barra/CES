Ext.define('Erems.library.Detailtool', {
    viewPanel: '',
    controllerName: '',
    winId: '',
    parentFDWindowId: '', // parent formdata window id
    parentGridAlias: '',
    params: {
        form: {
            editingIndexRow: 0
        }
    },
    grid: function() {
        var me = this;
        var myGrid = {};
        return myGrid;
    },
    setConfig: function(cfg) {
        this.viewPanel = cfg.viewPanel;
        this.controllerName = cfg.controllerName;
        this.parentFDWindowId = cfg.parentFDWindowId;
    },
    form: function() {
        var me = this;
        var myForm = {
            that: this,
            setEditingIndexRow: function(v) {
                me.params.form.editingIndexRow = v;
            },
            getEditingIndexRow: function() {
                return me.params.form.editingIndexRow;
            },
            getForm: function() {
                return Ext.WindowMgr.get(me.winId).down('form');
            },
            getField: function(name) {
                return this.getForm().down('[name=' + name + ']');
            },
            getFields: function() {
                return this.getForm().getForm().getFields().items;
            },
            setReadOnly: function(name, mode) {
                var xtype = '';
                var field = this.getField(name);
                mode = typeof mode == 'undefined' ? true : false;
                var c = mode ? '#F2F2F2' : '#FFFFFF';
                
                field.setReadOnly(mode);
                field.setFieldStyle('background-color:' + c + ';background-image: none;');
            },
            setValues: function(data) {
                if (typeof data != 'object')
                    return;
                var f = null;
                for (var x in data) {
                    f = this.getField(x);
                    if (f != null) {
                        f.setValue(data[x]);
                    }
                }
            },
            getValues: function() {
                var form = this.getForm();
                var val = {};
                /* check textbox*/
                var itemForms = form.getForm().getFields().items;
                for (var x in itemForms) {
                    val[itemForms[x]['name']] = itemForms[x]['value'];
                }



                return val;
            },
            show: function(state, width, title, id) {
                var formtitle, formicon;
                var panel = '';

                title = typeof title == 'undefined' ? 'My Window' : title;
                id = typeof id == 'undefined' ? 'myInstantWindow' : id;
                state = typeof state == 'undefined' ? 'create' : state;
                panel = me.viewPanel;
                width = typeof width == 'undefined' ? 600 : width;
                formtitle = title;
                formicon = 'icon-form-add';
                var winId = id;

                me.winId = winId;


                var win = desktop.getWindow(winId);
                if (!win) {
                    win = desktop.createWindow({
                        id: winId,
                        title: formtitle,
                        iconCls: formicon,
                        resizable: false,
                        minimizable: false,
                        maximizable: false,
                        width: width,
                        renderTo: Ext.getBody(),
                        constrain: true,
                        constrainHeader: false,
                        modal: true,
                        layout: 'fit',
                        shadow: 'frame',
                        shadowOffset: 10,
                        border: false,
                        items: Ext.create('Erems.view.' + me.controllerName + '.' + panel),
                        state: state
                    });

                }
                win.show();
                me._validation.valid = false;

                if(state == 'read' && win.down('#btnCancel') != null){ //// FORM VIEW
                    var btnItem = win.down('#btnCancel').up('toolbar[dock="bottom"]').items.items;
                    btnItem.forEach(function(x){
                        var itm = x.itemId;
                        if(itm != undefined && itm.includes('btnSave')){
                            x.hide();
                        }
                    });
                }
            },
            save: function() {

                var validation = me._validation;
                console.log(this.getValues());
                validation.proses(this.getValues());
                if (!validation.valid && me.form().getForm().getForm().isValid()) {
                    if (validation.erMsg.length > 0) {
                        Ext.Msg.show({
                            title: 'Alert',
                            msg: validation.erMsg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK,
                            fn: function() {

                            }
                        });
                    }

                } else {
                    var win = this.getForm().up('window');
                    var dStore = null;
                    var winPr = Ext.WindowMgr.get(me.parentFDWindowId);


                    dStore = winPr.down(me.parentGridAlias).getStore();
                    var finalValue = me._getFinalValues(this.getValues(), this.getForm());

                    if (win.state == 'create') {
                        dStore.add(finalValue);
                    } else {
                        var rec = dStore.getAt(this.getEditingIndexRow());
                        rec.beginEdit();
                        rec.set(finalValue);
                        rec.endEdit();
                    }
                    me._beforeWindowClose();
                    win.close();
                }




            },
            afterRender: function() {
                /// load Combobox if exists
                var form = this.getForm();

                /* check textbox*/
                var itemForms = form.getForm().getFields().items;
                for (var x in itemForms) {
                    /// make sure this component is combobox
                    if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                        if (itemForms[x].getStore().storeId != "ext-empty-store") {
                            itemForms[x].getStore().load();
                        }
                    }

                }
                me._formAfterRender();

            },
        };
        return myForm;
    },
    getParentForm: function() {
        return Ext.WindowMgr.get(this.parentFDWindowId).down('form');
    },
    _formAfterRender: function() {

    },
    _validation: {
        erMsg: '',
        valid: false,
        proses: function(formValues) {
            this.erMsg = 'Hello';
            this.valid = true;

        }
    },
    _getFinalValues: function(value, form) {
        /// code here
        return value;
    },
    _beforeWindowClose: function() {

    }




});

