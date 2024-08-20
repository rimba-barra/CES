Ext.define('Cashier.library.template.combobox.SubaccountcodeCombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.subaccountcodecombobox',
    store: 'Subaccountcode', //masuk dalam store
    fieldLabel: 'Sub Account',
    displayField: 'description', //mengambil data dari store
    valueField: 'subgl_id', //mengambil data dari store  
    queryMode: 'local',
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Subcode</div></th>',
            '<th width="80"><div class="x-column-header x-column-header-inner">Code 1</div></th>',
            '<th width="150"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{code1}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    listeners: {
        keyup: function (field) {
            var c = 0;
            var searchString = field.getValue();
            if (searchString) {

                this.store.filterBy(function (record, id) {
                    if (record.get('code').toLowerCase().indexOf(field.getValue()) > -1) {
                        console.log('code');
                        return true;
                    }
                    else if (record.get('description').toLowerCase().indexOf(field.getValue()) > -1) {
                        console.log('desc');
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }

        },
        buffer:300,
    },
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


