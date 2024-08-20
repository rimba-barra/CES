<?php

class Gl_Models_Coa extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'm_coa';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_querycoa = new Gl_Models_Query_Coa();
    }

    function coaRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {

                $parameter = $param['hideparam'];

                if ($parameter == 'default') {
                    $result = $this->defaultRead($param);
                    $arraydata = $result[1];
                } else if ($parameter == 'reportsubaccount') {
                    $result = $this->reportsubRead($param);
                    $arraydata = $result[1];
                } else if ($parameter == 'livesearch') {
                    $result = $this->searchRead($param);
                    $arraydata = $result[1];
                } else if ($parameter == 'project') {
                    $result = $this->projectRead();
                    $arraydata = $result[1];
                } else if ($parameter == 'pt') {
                    $result = $this->ptRead();
                    $arraydata = $result[1];
                } else if ($parameter == 'dependcombobox') {
                    $result = $this->dependcombobox($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'forcombobox') {
                    $result = $this->forCombobox($param);
                    $arraydata = $result[1];
                } else if ($parameter == 'distinctforlevel') {
                    $result = $this->fordistinctlevel($param);
                    $arraydata = $result[1];
                } else if ($parameter == 'foraccountvssub') {
                    $result = $this->foraccountvssub($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'forcashflow') {
                    $result = $this->forcashflow($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'coagrid') {
                    $result = $this->forcoagrid($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'coabykelsub') {
                    $result = $this->forcoabykelsub($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'ptbyuser') {
                    $result = $this->forcoaptbyuser($param);
                    $arraydata = $result[0];
                } else if ($parameter == 'isjournalonly') {
                    $result = $this->isjournalonlyRead($param);
                    $arraydata = $result[1];
                }

                if ($parameter == 'dependcombobox'
                        or $parameter == 'foraccountvssub'
                        or $parameter == 'forcashflow'
                        or $parameter == 'coagrid'
                        or $parameter == 'coabykelsub'
                ) {
                    $return['data'] = $arraydata;
                    $return['parameter'] = $parameter;
                    $return['success'] = true;
                } else {
                    $return['total'] = $result[0][0]['RECORD_TOTAL'];
                    $return['data'] = $arraydata;
                    $return['parameter'] = $parameter;
                    $return['success'] = true;
                }
            } catch (Exception $e) {
                //var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function forCombobox($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId()
        );
        $result = $this->execSP3('sp_coa_getall', $data);
        return $result;
    }

    function foraccountvssub() {
        $result = $this->_querycoa->getcoakelsubnotnull();
        return $result;
    }

    function forcashflow() {
        $result = $this->_querycoa->getcoacashflow();
        return $result;
    }

    function forcoagrid() {
        $result = $this->_querycoa->getcoagrid();
        return $result;
    }

    function forcoabykelsub($param) {
        $result = $this->_querycoa->getcoagridkelsub($param);
        return $result;
    }

    function forcoaptbyuser($param) {
        $result = $this->_querycoa->getcoaptbyuser($param);
        return $result;
    }

    

    function fordistinctlevel($param) {

        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param["report"],
        );

        $result = $this->execSP3('sp_coa_distinctlevel', $data);
        return $result;
    }

    function checkCOAbyPojectPT($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        // print_r($data);
        return $this->execSP3('sp_coa_checkdata', $data);
    }

    function dependcombobox($param) {
        $data = array(
            $param['project_id']
        );
        return $this->execSP3('sp_projectpt_read', $data);
    }

    function reportsubRead($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_coa_readsub', $data);
        return $result;
    }

    function defaultRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['start'],
            $param['limit']
        );
        //print_r($data);
        $result = $this->execSP3('sp_coa_readall', $data);
        //var_dump($this->sqlStr);        
        //die();  
        return $result;
    }

    function coaupoladRead($param) {
        $data = array(
            1,
            $param['project_id'],
            $param['pt_id'],
            $param['start'],
            $param['limit']
        );
        $result = $this->execSP3('sp_coa_readall', $data);  
        return $result;
    }

    function getjournalinfoRead($param) {
        $data = array(
            $param['journal_id']
        );
        $result = $this->execSP3('sp_getjournalinfo', $data);
        return $result;
    }


    function getSetupcashflow($param) {      
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['department_code'],
            $param['cashflowtype']
        );
        $result =  $this->execSP5('sp_getsetupcashflow', $data);
        return $result;
    }

    function getSetupcashflowbycoa($param) {      
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['department_id'],
            $param['coa_id']
        );
        $result =  $this->execSP5('sp_getsetupcashflowbycoa', $data);
        return $result;
    }

    function getSetupcashflowbydept($param) {      
        $data = array(
            $param['project_id'],
            $param['pt_id'],
            $param['department_id'],
            $param['coa_id'],
            $param['cashflow']
        );
        $result =  $this->execSP5('sp_getsetupcashflowbydept', $data);
        return $result;
    }


    function isjournalonlyRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['start'],
            $param['limit']
        );
        //print_r($data);
        $result = $this->execSP3('sp_coa_readisjournalonly', $data);
        //var_dump($this->sqlStr);        
        //die();  
        return $result;
    }

    function searchRead($param) {
        $data = array(
            1,
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coa_id'],
            $param['coacode'],
            $param['name'],
            //$param['name_convert'],
            $param['parent_id'],
            $param['parent_code'],
            $param['type'],
            $param['is_journal'],
            $param['report'],
            $param['level'],
            $param['kelsub_id'],
            $param['group_gl'],
            $param['start'],
            $param['limit'],
        );
        //print_r($data);
        $result = $this->execSP3('sp_coa_read', $data);
        //var_dump($this->sqlStr);        
        //die();  
        return $result;
    }

    function projectRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 57);
        //return $this->execSP3('sp_project_read', $param);
        $result = $this->execSP3('sp_projectbylogin_read', $data);
        // var_dump($this->sqlStr);        
        //die();   
        return $result;
    }

    function ptRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 57);
        //return $this->execSP3('sp_pt_read', $param);
        //  var_dump($this->sqlStr);  
        return $this->execSP3('sp_ptbylogin_read', $data);
    }

    function coaCreate($param = array()) {
        $return['success'] = false;

        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];


                if ($parameter == 'checkexist') {
                    $statusaccount = 1;
                    $level = '';
                    $total = 0;
                    $result = $this->checkExist($param);
                } else if ($parameter == 'buildlevel') {
                    $arraydata = $this->buildlevel($param);
                    $clusterdata = explode("#", $arraydata);
                    $statusaccount = $clusterdata[0];
                    $level = $clusterdata[1];
                    $total = 0;
                    $result = null;
                } else if ($parameter == 'dependcombobox') {
                    $statusaccount = 1;
                    $level = '';
                    $total = 0;
                    $result = $this->dependcombobox();
                } else if ($parameter == 'checkcoabyptproject') {
                    $statusaccount = 1;
                    $level = '';
                    $result = $this->checkCOAbyPojectPT($param);
                    $total = $result[0][0]['RECORD_TOTAL'];
                } else if ($parameter == 'importdata') {
                    $statusaccount = 1;
                    $level = '';
                    $result = $this->importCOA($param);
                    $total = 0;
                } else {
                    $statusaccount = 1;
                    $level = '';
                    $total = 0;
                    $result = $this->createData($param);
                    //start set journal if parent code exist
                    $this->setJournal($param);
                    //end
                }



                //print_r($result);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
                $return['data'] = $result[0];

                if ($return['total'] != 1) {
                    $return['data'] = $result[0];
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['parameter'] = $parameter;
                    $return['level'] = ($level >= 7) ? 7 : $level;
                    $return['statusaccount'] = $statusaccount;
                    $return['total'] = $total;
                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function importCOA($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id'],
                // $param['fromlevel'],
                //  $param['untillevel']
        );
        $result = $this->execSP3('sp_coa_import', $data);
        foreach ($result[0] as $row) {


            $dataimport = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $row["coa"],
                $row["name"],
                $row["parent_id"],
                $row["parent_code"],
                $row["type"],
                $row["is_journal"],
                $row["report"],
                $row["level"],
                $row['group_gl'],
                $this->session->getUserId(),
                '1'
            );
            //  print_r($dataimport);
            $this->execSP3('sp_coa_import_insert', $dataimport);
        }
        $this->getCoaAfterImport();
        return 1;
    }

    function getCoaAfterImport() {
        error_reporting(0);
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
        );

        $result = $this->execSP3('sp_coa_import_afterinsert', $data);


        foreach ($result[0] as $row) {
            if (!is_null($row['parent_code'])) {
                $iddatachield = $row['coa_id'];
                $parent = $row['parent_code'];

                if (!is_null($parent) or $parent == '') {
                    $coaid = $this->getcoaid($parent);
                    $idparent = $coaid;
                } else {
                    $idparent = $iddatachield;
                }



                $dataupdate = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $iddatachield,
                    $idparent
                );
                $this->execSP3('sp_coa_update_parent', $dataupdate);
                //print_r($dataupdate);
            }
        }
    }

    function createData($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coacode'],
            $param['name'],
            $param['parent_id'],
            $param['parent_code'],
            $param['type'],
            $param['is_journal'],
            $param['report'],
            $param['level'],
            $param['kelsub_id'],
            $param['group_gl'],
            $this->session->getUserId(),
            '1'
        );
        return $this->execSP3('sp_coa_create', $data);
    }

    function checkExist($param) {
        $data = array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['coacode'],
            $param['name']
        );

        return $this->execSP3('sp_coa_checkexist', $data);
    }

    function buildlevel($param) {
        $code = explode('.', $param['parent_code']);
        $coa = explode('.', $param['coacode']);

        if (count($code) != 1) {
            $counter = $code[0] . $code[1] . $code[2];
            $countercoa = $coa[0] . $coa[1] . $coa[2];

            $tmp = str_replace('0', '', $counter);
            $tmp1 = $counter;
            $tmp2 = $countercoa;

            $val1 = intval($tmp1);
            $val2 = intval($tmp2);

            $valstr1 = substr($tmp1, 0, 1);
            $valstr2 = substr($tmp2, 0, 1);

            if ($val1 > $val2) {
                $status = 0;
            } else {
                $a = 1;
                if (intval($valstr1) > intval($valstr2)) {
                    $a = 0;
                } else {
                    $a = 1;
                }
                $status = $a;
            }

            $tmpstatus = $status;

            $strnomor = strval($tmp . '1');
            $tmplevel = strlen($strnomor);
        } else {
            $tmpstatus = 1;
            $tmplevel = 1;
        }
        return $tmpstatus . "#" . $tmplevel;
    }

    function setJournal($param) {
        $code = explode('.', $param['parent_code']);
        if (count($code) != 1) {
            $data = array(
                $this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $param['parent_code']
            );
            $coaid = $this->getcoaid($param['parent_code']);
            // print_r($resultdata[0][0]['coa_id']);	
            if ($coaid) {
                $iddata = $coaid;
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $iddata,
                    0,
                    $this->session->getUserId()
                );
                $this->execSP3('sp_coa_update_statusjournal', $data);
            }
        }
    }

    function coaUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['coa_id'],
                    $param['coacode'],
                    $param['name'],
                    $param['parent_id'],
                    $param['parent_code'],
                    $param['type'],
                    $param['is_journal'],
                    $param['report'],
                    $param['level'],
                    $param['kelsub_id'],
                    $param['group_gl'],
                    $this->session->getUserId(),
                    '1'
                );


                $result = $this->execSP3('sp_coa_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                }
            } catch (Exception $e) {
                //var_dump($e->getMessage());
            }
        }
        return $return;
    }

    function coaDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'coa_id';
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
                $result = $this->execSP3('sp_coa_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    public function getcoaid($coa) {
        $result = $this->execSP3('sp_coa_getbycoa', array(
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $coa
        ));
        return $result[0][0]['coa_id'];
    }

}

?>