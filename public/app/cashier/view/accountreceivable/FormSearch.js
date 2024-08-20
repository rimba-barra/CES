Ext.define('Cashier.view.accountreceivable.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.accountreceivableformsearch',
    initComponent: function() {
        var me = this;
        

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection:false,
                    typeAhead:false,
                            listeners:{
                                
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {
                                           
                                       this.store.filterBy(function (record, id) {
                                         
                                        if( record.get('name').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        
                                        else {
                                            return false;
                                            this.store.clearFilter(true);
                                        }
                                        });
                                       }

                                },
                                buffer:300,
                            },
                },
                {
                    xtype: 'combobox',
                    name: 'year',
                    fieldLabel: 'Periode',
                    displayField: 'year',
                    valueField: 'year',
                    queryMode:'local',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
