Ext.define('Gl.library.box.tools.CRUDButtonHandlerFmd', {
    extend: 'Gl.library.box.tools.CRUDButtonHandler',
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    run: function(state) {
        var me = this;
        switch (state) {
            case 'ADD':
                me.doAdd();
                break;
            case 'EDIT':
                me.doEdit();
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
                me.doDelete();
                break;
        }
    },
    doDelete: function() {
        var me = this;
        var c = me.getc();
        if (c) {
            if (typeof c.crudbrFunc === 'function') {
                if (typeof c.crudbrFunc().destroy === 'function') {
                    c.crudbrFunc().destroy();
                }

            }
        }
    },
    doEdit:function() {
        var me = this;
        var tb = me.getToolBox();
        if (tb) {
            tb.down("[action=save]").setDisabled(false);
            tb.down("[action=cancel]").setDisabled(false);
            tb.down("[action=create]").setDisabled(true);
            tb.down("[action=edit]").setDisabled(true);
            tb.down("[action=delete]").setDisabled(true);
            var c = me.getc();
            if (c) {
                if (typeof c.crudbrFunc === 'function') {
                    if (typeof c.crudbrFunc().edit === 'function') {
                        c.crudbrFunc().edit();
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
            tb.down("[action=delete]").setDisabled(false);
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
            tb.down("[action=delete]").setDisabled(true);
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
});
