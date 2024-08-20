Ext.define('Cashier.view.subeditor.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.subeditorformsearch',
    initComponent: function () {
        var me = this;
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var startDate = new Date(year, month-3, day);


        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '91%'
            },
            items: [
            {
                xtype: 'hiddenfield',
                name: 'hideparam',
                value: 'default'
            },
            {
                xtype: 'projectcombobox',
                fieldLabel:'Project',
                emptyText: 'Select Project',
                name: 'project_id',
                itemId: 'project_id',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                enforeMaxLength: true,
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
                    ),   
            },
            {
                xtype: 'ptprojectcombobox',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id',
                itemId: 'pt_id',
                allowBlank: false,
                margin: '0 0 5 0',
                enableKeyEvents: true
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Voucher Date',
                layout: 'hbox',
                items: [
                {
                    xtype: 'datefield',
                    emptyText: 'From Date',
                    name: 'fromdate',
                    itemId: 'fs_fromdate_cdr',
                    id: 'fromdate_cdr',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 100,
                    enforceMaxLength: true,
                    maxLength: 10,
                    enableKeyEvents: true,
                    value: startDate
                },
                {
                    xtype: 'label',
                    forId: 'lbl1',
                    text: 'To',
                    margin: '2 10 0 10'
                },
                {
                    xtype: 'datefield',
                    itemId: 'fd_untildate_cdr',
                    id: 'untildate_cdr',
                    fieldLabel: '',
                    emptyText: 'Until Date',
                    name: 'untildate',
                    enforceMaxLength: true,
                    maxLength: 10,
                    enableKeyEvents: true,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 100,
                    value: new Date()
                }
                ]
            },
            {
                xtype: 'textfield',
                itemId: 'jid',
                name: 'src_jid',
                fieldLabel: 'JID',
                enforceMaxLength: true,
                emptyText: 'Input JID',
                maskRe: /[^\`\"\']/,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                itemId: 'voucher_no',
                name: 'src_voucher_no',
                emptyText: 'Input Voucher No',
                fieldLabel: 'Voucher No',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                itemId: 'coa',
                name: 'src_coa',
                emptyText: 'Input COA',
                fieldLabel: 'COA',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50
            },
            
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
