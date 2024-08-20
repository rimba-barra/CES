Ext.define('Cashier.view.pajakprogresif.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.pajakprogresifformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'persentaseprogdetail_id',
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel:'Project',
                    emptyText: 'Select Project',
                    name: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="250px" >',
                        '<tr class="x-grid-row">',
                            
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                                '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                            '</tr>',
                        '</tpl>',
                        '</table>'
                    )
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'mastertipepajakcombo',
                    fieldLabel:'Tipe Pajak',
                    emptyText: 'Select Tipe Pajak',
                    name: 'tipepajakdetail_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '10 0 0 0'
                },
                {
                    xtype: 'numberfield',
                    itemId: 'fdms_seq',
                    name: 'sequence',
                    fieldLabel: 'Sort',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },  
                {
                    xtype: 'xmoneyfield',
                    itemId: 'fdms_persentase',
                    name: 'persentase',
                    fieldLabel: 'Persentase (%)',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true
                },    
                {
                    xtype: 'xmoneyfield',
                    itemId: 'fdms_min_amount',
                    name: 'min_amount',
                    fieldLabel: 'Min Amount',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },    
                {
                    xtype: 'xmoneyfield',
                    itemId: 'fdms_max_amount',
                    name: 'max_amount',
                    fieldLabel: 'Max Amount',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },           
                {
                    xtype: 'xmoneyfield',
                    itemId: 'fdms_factor_amount',
                    name: 'factor_amount',
                    fieldLabel: 'Factor Amount',
                    enableKeyEvents: true,
                    allowBlank: false,
                    readOnly: true,
                    enforceMaxLength: true,
                }
              
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

