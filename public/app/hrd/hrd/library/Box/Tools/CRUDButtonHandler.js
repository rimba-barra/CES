Ext.define('Hrd.library.box.tools.CRUDButtonHandler', {
    formId: '',
    toolboxId: '',
    cName: '',
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    init: function() {
        //// attach event to toolbox
        var me = this;
        var tb = me.getToolBox();
        if (tb) {
            var s = tb.down("[action=create]");
            if (s) {
                s.on('click', function() {
                    me.run('ADD');
                });
            }
            var c = tb.down("[action=cancel]");
            if (c) {
                c.on('click', function() {
                    me.run('CANCEL');

                });
            }
            var e = tb.down("[action=edit]");
            if (e) {
                e.on('click', function() {
                    me.run('EDIT');
                });
            }
            var sv = tb.down("[action=save]");
            if (sv) {
                sv.on('click', function() {
                    me.run('SAVE');
                });
            }
            var sd = tb.down("[action=delete]");
            if (sd) {
                sd.on('click', function() {
                    me.run('DELETE');
                });
            }
        }

        /// run lock
        me.run('LOCK');
    },
    run: function(state) {
        var me = this;
        switch (state) {
            case 'ADD':
                me.doAdd();
                break;
            case 'EDIT':
                me.doAdd();
                break;
            case 'SAVE':

                me.doSave();
                break;
            case 'LOCK':
                me.doLock();
                break;
            case 'CANCEL':
                me.doCancel();
                break;
            case 'DELETE':
                break;
        }
    },
    getForm: function() {
        return Ext.getCmp(this.formId);
    },
    getToolBox: function() {
        return Ext.getCmp(this.toolboxId);
    },
    getc: function() {
        return _Apps.getController(this.cName);
    },
    doCancel: function() {
        var me = this;
        me.run('LOCK');
        var c = me.getc();
        if (c) {
            if (typeof c.crudbrFunc === 'function') {
                if (typeof c.crudbrFunc().cancel === 'function') {
                    c.crudbrFunc().cancel();
                }
            }
        }
    },
    doSave: function() {
        var me = this;
        var c = me.getc();
        if (c) {
            if (typeof c.crudbrFunc === 'function') {
                c.crudbrFunc().save(me.getForm());
            }
        }
    },
    doAdd: function() {
        var me = this;
        var tb = me.getToolBox();
        if (tb) {
            tb.down("[action=save]").setDisabled(false);
            tb.down("[action=cancel]").setDisabled(false);
            tb.down("[action=create]").setDisabled(true);
            tb.down("[action=edit]").setDisabled(true);
            var c = me.getc();
            if (c) {
                if (typeof c.crudbrFunc === 'function') {
                    if (typeof c.crudbrFunc().add === 'function') {
                        c.crudbrFunc().add();
                    }

                }
            }
        }
        me.disableForm(false);
    },
    doLock: function() {
        var me = this;
        me.disableForm(true);
        var tb = me.getToolBox();
        if (tb) {
            tb.down("[action=save]").setDisabled(true);
            tb.down("[action=cancel]").setDisabled(true);
            tb.down("[action=create]").setDisabled(false);
            tb.down("[action=edit]").setDisabled(false);

        }

    },
    disableForm: function(disabled) {
        var me = this;
        var f = me.getForm();
        if (f) {
            var vs = f.getForm().getValues();
            for (var i in vs) {
                var el = f.down("[name=" + i + "]");
                if (el) {
                    el.setReadOnly(disabled);
                }
            }
        }
    }


});
