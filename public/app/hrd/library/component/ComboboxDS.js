/*
 * 
 * ComboboxDS
 * 
 */
Ext.define('Hrd.library.component.ComboboxDS', {
    extend: 'Ext.form.field.ComboBox',
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




    }
});


