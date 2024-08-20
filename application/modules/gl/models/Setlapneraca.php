<?php

class Gl_Models_Setlapneraca extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_rptformat';
    protected $session;
    protected $current_project_id = 0;
    protected $current_pt_id = 0;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_query = new Gl_Models_Generalmodel_Builtquery();
        $this->current_project_id = $this->session->getCurrentProjectId();
        $this->current_pt_id = $this->session->getCurrentPtId();
    }

    function setlapneracaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->current_project_id = $param['project_id'];
                $this->current_pt_id = $param['pt_id'];
                $parameter = $param['hideparam'];
                if ($parameter == 'default') {
                    $result = $this->defaultRead($param);
                    $arraydata = $result[1];
                }

                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function defaultRead($param) {
        $data = array(
            1,
            $param['project_id'], //$this->session->getCurrentProjectId(),
            $param['pt_id'], //$this->session->getCurrentPtId(),
            'N',
            $param['report_level'],
            $param['start'],
            $param['limit']
        );

        return $this->execSP3('sp_setlapneraca_read', $data);
    }

    function setlapneracaCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->current_project_id = $param['project_id'];
                $this->current_pt_id = $param['pt_id'];
                $parameter = $param['hideparam'];
                if ($parameter == 'generate') {
                    $result = $this->setGenerate($param);
                }else if ($parameter == 'checkexist') {
                    $result = $this->checkExist($param);
                } else if($parameter == 'default'){
                    $result = $this->defaultCreate($param);
                }

                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                    $return['parameter'] = $parameter;
                    //$return['statusgenerate'] = $result[1];
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function setGenerate($param) {
        $data = array(
            $this->current_project_id, // $this->session->getCurrentProjectId(),
            $this->current_pt_id, //$this->session->getCurrentPtId(),
            'N',
            $param['from'],
            $param['until']
        );
        
        $this->execSP3('sp_setlapbalance_truncate', $data);
        $this->execSP3('sp_setlapbalacetmpreport_create', $data);
        $arrayheader = $this->setHeader(0, $param['until']);
        $this->buildchield($arrayheader);
        $this->setSort($param['until']);
        $this->changeHeaderifchieldempty($data);
        $arrstatus = array(0, 'finish');
        return $arrstatus;
    }
    
    function changeHeaderifchieldempty($param){        
        $this->_query->changeheadertochield($param);
    }

    function setHeader($parent_coa = 0, $until = 0) {
        $data = array(
            $parent_coa
        );
        $result = $this->execSP3('sp_setlapbalancetmpreport_read', $data);       
        $arraydata = $result[0];
        $recursive_header = array();
        $datacluster = array();
        foreach ($arraydata as $row) {
            
            if ($until > 3) {
                if ($row['journal'] == 0) {
                    $flag = 'H';
                } else {
                    $flag = 'I';
                }
                $flag = $flag;
            } else {
                if ($row['level'] == $until) {
                    $flag = 'I';
                } else {
                    $flag = 'H';
                }
                $flag = $flag;
            }


            $datacluster['tmp_id'] = $row['tmp_id'];
            $datacluster['coa_id'] = $row['coa_id'];
            $datacluster['coa'] = $row['coa'];
            $datacluster['report'] = $row['report'];
            $datacluster['last_level'] = $until;
            $datacluster['level'] = $row['level'];
            $datacluster['name'] = $row['name'];
            $datacluster['parent'] = $row['parent_code'];
            $datacluster['journal'] = $row['journal'];
            $datacluster['type'] = $row['type'];
            $datacluster['flag'] = $flag;
            $datacluster['child'] = $this->setHeader($row['coa'], $until);
            $recursive_header[] = $datacluster;
        }
        return $recursive_header;
    }

    function buildchield($data) {

        if (is_array($data)) {

            foreach ((array) $data as $row) {
                switch ($row['level']) {
                    case 1: $css = '#ffff00';
                        break;
                    case 2: $css = '#ff3399';
                        break;
                    case 3: $css = '#00ffff';
                        break;
                    case 4: $css = '#999966';
                        break;
                    case 5: $css = '#66b3ff';
                        break;
                    case 6: $css = '#ffffff';
                        break;
                    case 7: $css = '#f2f2f2';
                        break;
                    case 8: $css = '#666600';
                        break;
                    case 9: $css = '#006666';
                        break;
                    case 10: $css = '#006633';
                        break;
                    case 11: $css = '#660000';
                        break;
                    case 12: $css = '#000066';
                        break;
                }
                // for set data coa   
                $no = $row['tmp_id'];
                
                //added 02-09-2016 untuk filter flag
                if (!empty($row['child'])){
                    $flag='H';
                }else{
                    $flag='I';
                }
                    
                    
                $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . $row['name'], $row['level'], $flag, $row['type']);
                if (!empty($row['child'])) {
                    $this->buildchield($row['child']);
                    $no = $row['tmp_id'];
                    //for set sum coa
                    $this->insertbyGenerate($row['coa_id'], $row['report'], $row['last_level'], $no, $row['coa'], str_repeat("-", $row['level']) . 'TOTAL ' . $row['name'], $row['level'], 'T', $row['type']);
                    //for set space coa
                    $this->insertbyGenerate('0', $row['report'], $row['last_level'], $no, '', '', '', '', '');
                }
            }
        }
    }

    function insertbyGenerate($coa_id, $report, $last_level, $sort, $coa, $name, $level, $flag, $type) {
        $data = array(
            $this->current_project_id, // $this->session->getCurrentProjectId(),
            $this->current_pt_id, //$this->session->getCurrentPtId(),
            $coa_id,
            $report,
            $last_level,
            $sort,
            $coa,
            $name,
            $level,
            $flag,
            $type,
            $this->session->getUserId(),
            1
        );  
       
        $this->execSP3('sp_setlapneraca_generate', $data);
    }

    function checkExist($param) {
        $data = array(
            $this->current_project_id, // $this->session->getCurrentProjectId(),
            $this->current_pt_id, //$this->session->getCurrentPtId(),
            $param['coa'],
            $param['report_level']
        );

        return $this->execSP3('sp_setlapneraca_checkexist', $data);
    }

    function defaultCreate($param) {
        $paramcoa = array(
            $this->current_project_id, // $this->session->getCurrentProjectId(),
            $this->current_pt_id, //$this->session->getCurrentPtId(),
            $param['coa']
        );
        $rowdata = $this->execSP3('sp_coa_getbycoa', $paramcoa);
        $coa_id = ($rowdata[0][0]['coa_id']);
        if ($coa_id > 0) {
            $data = array(
                $this->current_project_id, // $this->session->getCurrentProjectId(),
                $this->current_pt_id, //$this->session->getCurrentPtId(),
                $param['sort'],
                $coa_id,
                $param['coa'],
                $param['name'],
                'N',
                $param['report_level'],
                $param['level'],
                $param['type'],
                $param['flag'],
                $this->session->getUserId(),
                '1'
            );
            return $this->execSP3('sp_setlapneraca_create', $data);
        } else {
            return null;
        }
    }

    function setSort($lastlevel) {
        $data = array(
            $this->current_project_id, // $this->session->getCurrentProjectId(),
            $this->current_pt_id, //$this->session->getCurrentPtId(),
            $lastlevel,
        );
        $result = $this->execSP3('sp_setlapneraca_readafter_generate', $data);
        $arraydata = $result[0];
        $no = 0;
        foreach ($arraydata as $row) {
            $no++;
	    if($lastlevel == $row['level'] and $row['flag']=='H'){
                $flag ='I';
            }else{
                $flag =$row['flag'];
            }	
	
            $idreport = $row['rptformat_id'];
            $sort = $no;
	    $data = array($idreport,$sort,$flag);           
            $this->execSP3('sp_setlapneraca_updateafter_generate', $data);
        }
    }

    function setlapneracaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $this->current_project_id = $param['project_id'];
                $this->current_pt_id = $param['pt_id'];
                $data = array(
                    $this->current_project_id, // $this->session->getCurrentProjectId(),
                    $this->current_pt_id, //$this->session->getCurrentPtId(),
                    $param['rptformat_id'],
                    $param['sort'],
                    $param['coa'],
                    $param['name'],
                    $param['report_level'],
                    $param['level'],
                    $param['type'],
                    $param['flag'],
                    $this->session->getUserId(),
                    '1'
                );
                $result = $this->execSP3('sp_setlapneraca_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

    function setlapneracaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'rptformat_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_setlapneraca_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                //var_dump($e);
            }
        }
        return $return;
    }

}

?>