/*
 * 
 * ComboboxDS
 * 
 */
Ext.define('Hrd.library.component.ComboboxDS2', {
    extend: 'Hrd.library.component.ComboboxDS',
    alias: 'widget.ds2combobox',
    requires: ['Hrd.library.box.StoredElement'],
    storeConfig: {
        id: 'cbComboboxStore',
        idProperty: 'table_id',
        extraParams: {}
    },
    storedElement: null,
    /*@doInit
     *@param autoRun set true for auto load data
     *@param callback for run function after load data
     * */
    doInit: function(autoRun, params,callbackFunc) {
        var me = this;
        /* added 14 february 2014*/
        me.storeConfig = {
            id: me.storeID,
            idProperty: me.storeIdProperty,
            extraParams: {
                mode_read: me.mode_read
            }
        };
        /**/
        if (!me.storedElement) {
            me.storedElement = new Hrd.library.box.StoredElement({
                el: this
            });
        }
        me.storedElement.init();
        var ar = typeof autoRun === "undefined" ? false : autoRun;
        if (ar) {
            me.getStore().load({
                params:params,
                callback: function(rec, op) {
                    me.attachModel(op);
                    me.setDefaultValue(true);
                    if (typeof callbackFunc === "function") {
                        callbackFunc();
                    }
                }
            });
        }
    },
    setDefaultValue: function(last) {
        var me = this;
        var i = typeof last !== "undefined" ? last : false;
        var store = me.getStore();
        if (store.getCount() > 0) {
            var record = store.getAt(i ? store.getCount() - 1 : 0);
            me.setValue(record);
        }

    },
    attachModel: function(data) {
        var me = this;
        me.storedElement.attachModel(data);
    },
    xLoad: function() {

    }
    /* getDisplayValue:function(){
     var me = this;
     var value = null;
     var store = me.getStore();
     value = store.getAt(store.findExact(store.getProxy().getReader().getIdProperty().ge,me.getValue())).get(me.displayField);
     return value;
     }*/
});


