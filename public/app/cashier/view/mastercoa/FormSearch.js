Ext.define('Cashier.view.mastercoa.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.mastercoaformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
            {
                xtype: 'projectptcombobox',
                name: 'projectpt_id',
                fieldLabel: 'Project/PT',
                valueField: 'projectpt_id',
                anchor: '-4',
                allowBlank: false,
                margin: '5 0 5 0',
                rowdata: null,
                enableKeyEvents: true,
                enforceMaxLength: true,
                forceSelection: true,
                typeAhead:false,
                tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                    '<tr class="x-grid-row">',
                    '<th width="220px"><div class="x-column-header x-column-header-inner">NAMA PROJECT</div></th>',
                    '<th width="60px"><div class="x-column-header x-column-header-inner">KODE PT</div></th>',
                    '<th width="220px"><div class="x-column-header x-column-header-inner">NAMA PT</div></th>',
                    '</tr>',
                    '<tpl for=".">',
                    '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                    '</tr>',
                    '</tpl>',
                    '</table>'
                    ),
                listeners: {
                    keyup: function (field) {
                        var searchString = field.getRawValue().toString().toLowerCase();
                        if(searchString == null){
                            return false;
                        }
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('ptname') == null || record.get('ptcode') == null) {
                                    return false;
                                }else{
                                    if (record.get('ptname').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('ptcode').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }    
                                }

                            });
                        }
                    },
                    
                    buffer:300
                }, 
            },
            {
                xtype: 'textfield',
                itemId: 'fsms_coacode',
                name: 'coa',
                fieldLabel: 'Chart of Account(COA)',
                allowBlank: false,
                enforceMaxLength: true,
                maxLength: 9,
                absoluteReadOnly: true,
                anchor: '-5',
                enableKeyEvents: true
            },
            {
                xtype: 'textfield',
                itemId: 'fsms_name',
                name: 'name',
                fieldLabel: 'Account Name',
                enforceMaxLength: true,
                maxLength: 100,
                anchor: '-5'
            },
            ],
            dockedItems: me.generateDockedItems()
        });

me.callParent(arguments);
}
});
