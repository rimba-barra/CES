Ext.define('Hrd.view.scoringbsc.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: [
        'Hrd.view.scoringbsc.Grid',
        'Hrd.view.scoringbsc.FormSearch'
    ],
    alias: 'widget.scoringbscpanel',
    itemId: 'ScoringbscPanel',
    gridPanelName: 'scoringbscgrid',
    formSearchPanelName: 'scoringbscformsearch'
});