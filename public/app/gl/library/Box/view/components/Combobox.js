/*
 * 
 * ComboboxDS
 * 
 */
Ext.define('Gl.library.box.view.components.Combobox', {
    extend: 'Ext.form.field.ComboBox',
    /* ORI*/
    beforeRender: function() {
        var me = this;
        var store = Ext.StoreManager.lookup(me.store);

    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);

    },
    /*added 12 Mei 2014 */
    getSelectedRec:function(){
        var me = this;
        var s = me.getStore();
        var index = s.findExact(s.getProxy().getReader().getIdProperty(),me.getValue());
        var rec = s.getAt(index);
        return rec;
    },
    getSelectedVal: function(nameField, idValue) {
        var me = this;
        var s = me.getStore();
        var hasil = '';
        if (typeof nameField != 'undefined' && typeof idValue != 'undefined') {
            var rec = s.getById(idValue);
            if(rec!==null){
                hasil = rec.get(nameField);
            }
            return hasil;
       
        } else {
            var rec = s.getById(me.getValue());
            if(rec!==null){
                hasil = rec.get(me.displayField);
            }
            return hasil;
            
        }


    },
    /* ORI */
    /* DS*/
    alias: 'widget.dscombobox',
    mode_read: 'combobox_ds',
    storeUrl: 'spk',
    storeIdProperty: 'spk_id',
    storeID: 'storeId',
    queryMode: 'local',
    /* auto binding model*/
    createStore: function(ctrl, model) {
        var me = this;
        var s = me.getStore();
        if (s.storeId === 'ext-empty-store') {
            var x = ctrl.instantStore({
                id: ctrl.controllerName + '' + me.storeID,
                idProperty: me.storeIdProperty,
                url: me.storeUrl,
                extraParams: {
                    mode_read: me.mode_read
                }
            });
            me.bindStore(x);

            s = me.getStore();

            ctrl.nomBindingModel(model, s);
        }
    },
    
    getSelectedText: function() {
        var me = this;
        var s = me.getStore();
        var hasil = false;
        var index = s.findExact(s.getProxy().getReader().getIdProperty(),me.getValue());
        var rec = s.getAt(index);
        if (rec) {
            hasil = rec.get(me.displayField);
        }
        return hasil;




    },
    /* END DS*/
    requires: ['Gl.library.box.StoredElement'],
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
            me.storedElement = new Gl.library.box.StoredElement({
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

    },
    /* added 7 Agustus 2014*/        
    setFirstValue:function(){
        var store = this.getStore();
        var idProperty = store.getProxy().getReader().getIdProperty();
        var record = store.getAt(0);
        this.setValue(record.get(idProperty));
    }  
    
});


