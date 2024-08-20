/*
 * 
 * ComboboxDS
 * 
 */
Ext.define('Cashier.library.component.ComboboxDS2', {
    extend: 'Cashier.library.component.ComboboxDS',
    alias: 'widget.ds2combobox',
    requires: ['Cashier.library.StoredElement'],
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
    doInit: function(autoRun, callbackFunc) {
        var me = this;
        /* added 14 february 2014*/
        me.storeConfig = {
            id: me.storeID,
            idProperty: me.storeIdProperty,
            extraParams: {
                mode_read:me.mode_read
            }
        };
        /**/
        if (!me.storedElement) {
            me.storedElement = new Cashier.library.StoredElement({
                el: this
            });
        }
        me.storedElement.init();
        var ar = typeof autoRun === "undefined" ? false : autoRun;
        if (ar) {
            me.getStore().load({
                callback: function(rec, op) {
                    me.attachModel(op);
                    if (typeof callbackFunc === "function") {
                        callbackFunc();
                    }
                }
            });
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


