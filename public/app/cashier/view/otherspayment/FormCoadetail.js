Ext.define('Cashier.view.otherspayment.FormCoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.otherspaymentformcoadetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 340,
    kosongGa:-1,
    bodyBorder: true,
    bodyPadding: 10,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'coadetail_id',
                    name: 'coa_config_detail_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'coa_name',
                    name: 'coa_name',
                    allowBlank: false,
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'amount_hidden_id',
                    name: 'amount_hidden',
                    allowBlank: false,
                },
                
                
               {
                    xtype: 'combobox',
                    name: 'coa_id',
                    fieldLabel: 'Coa Name',
                    displayField: 'name',
                    valueField: 'coa_id',
                    width: 400,
                    queryMode:'local',
                    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="15px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">Name</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
     ),  

                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Coa account',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5',
                    readOnly:true

                },
                                                    {
                                                        xtype: 'combobox',
                                                    queryMode:'local',
                                                    fieldLabel: 'Dataflow ',
                                                    anchor: '-5',
                                                    name: 'type',
                                                    emptyText: 'O',
                                                    store: ['O','I'],
                                                },
//                {
//                    xtype: 'textfield',
//                    name: 'type',
//                    fieldLabel: 'Data Flow',
//                    enforceMaxLength: true,
//                    maxLength: 30,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
                {
                    xtype: 'textfield',
                    itemId: 'attributevalue',
                    name: 'persen',
                    fieldLabel: 'Persen',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5',
                    allowBlank: false,

                },
                {
                    xtype: 'textfield',
                    itemId: 'attributevalues',
                    name: 'amount',
                    fieldLabel: 'Amount',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5',
                    allowBlank: false,

                },
            {
                    xtype: 'textareafield',
                    itemId: 'desc',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'

                },],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

