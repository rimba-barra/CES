<?php
/**
 * Description of OrganizationchartDao
 *
 * @author MIS
 */
class Hrd_Models_Organizationchart_OrganizationchartDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public $setup =null;
    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
    }
    
    public function save(Hrd_Models_Organizationchart_Organizationchart $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_organizationchart_create',
		$this->setup->_project_id,
		$this->setup->_pt_id,
		$d->getAddBy(),
		$d->getName(),
		$d->getCode(),
		$d->getDescription()
		);
        return $hasil;
    }
    
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Organizationchart_Organizationchart $d){
       $hasil = 0;
        if (!empty($r->getModeRead())) {
            if ($r->getModeRead() == 'organizationchart') {
                $r->setPage(1);
                $r->setLimit(99999999);
            }
        }
	
        $data = $this->dbTable->SPExecute('sp_organizationchart_read', $this->setup->_project_id, $this->setup->_pt_id, $r->getPage(), $r->getLimit());
        //var_dump($this->dbTable);
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['organizationchart_id'];
        }
        array_multisort($name, SORT_ASC, $result);
        $hasil = array(array(array("totalRow" => $totalrow)), $result);
        return $hasil;
    }
    
    public function getAllWOPL(Hrd_Models_Organizationchart_Organizationchart $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_organizationchart_read',$this->setup->_project_id,$this->setup->_pt_id,1,9999,$d->getCode(),$d->getName());
        return $hasil;
    }

    public function update(Hrd_Models_Organizationchart_Organizationchart $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPUpdate('sp_organizationchart_update',$this->setup->_project_id,$this->setup->_pt_id, $em->getAddBy(), $em->getId(),$em->getName(),$em->getCode(),$em->getDescription(),$em->getManager());
        return $hasil;
    }
    
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_organizationchart_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getAllbyparam(Hrd_Models_Organizationchart_Organizationchart $param){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_organizationchart_read',$param->getProject()->getId(),$param->getPt()->getId(),1,9999,'');
        return $hasil;
    }

    public function saveHeader($organizationchart_id) {
        $obj = new Hrd_Models_Organizationchart_Organizationchart();
        $hasil = 0;
        if($organizationchart_id == ''){
            $hasil = $this->dbTable->SPUpdate(
                'sp_organizationchart_create', 
		$this->setup->_user_id,
		$this->setup->_project_id,
		$this->setup->_pt_id
            ); 
        } else {
            $hasil = 1;
        }
        
        //var_dump($this->dbTable);
        return $hasil;
    }
	
    public function getPositionlist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
        $r->setPage(1);
        $r->setLimit(99999999);	
        $hasil = $this->dbTable->SPExecute('sp_organizationchartposition_read', $r->getPage(), $r->getLimit(), $data['description'], $session->getProject()->getId());
        //var_dump($this->dbTable);
        return $hasil;
    }
//    
//    public function selectposition($session, $datadetail) {
//        $hasil = 0;
//        $hasil = $this->dbTable->SPUpdate(
//            'sp_organizationchart_selectposition', 
//			$session->getUser()->getId(), 
//			$session->getProject()->getId(), 
//			$session->getPt()->getId(), 
//			$datadetail['organizationchart_id'], 
//			$datadetail['position_id']
//        );  
//        return $hasil;	
//    }
//    
    public function detailsave($session, $datadetail) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_organizationchartdetail_create', 
			$session->getUser()->getId(), 
			$datadetail['organizationchart_id'], 
			$datadetail['position_id'], 
			$datadetail['parent_id'], 
			$datadetail['order_no'], 
			$datadetail['orglevel'], 
			$datadetail['isbetween'] == 'true'? 1 : 0
        );  
        //var_dump($this->dbTable);
        return $hasil;	
    }
    
    public function deletedetail($session, $datadetail) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_organizationchartdetail_destroy', 
			$session->getUser()->getId(), 
			$datadetail['organizationchart_detail_id']
        );  
        //var_dump($this->dbTable);
        return $hasil;	
    }
    	
    public function getDetaillist(Box_Models_App_HasilRequestRead $r, $session, $data) {
        $obj_setup = new Hrd_Models_General_Setup();
        $hasil = 0;   
        $r->setPage(1);
        $r->setLimit(99999999);	
        $hasil = $this->dbTable->SPExecute('sp_organizationchartdetail_read', $data['id']);
        //var_dump($hasil);
        return $hasil;
    }
}

?>
