<?php
/**
 * Description of ClusterB
 *
 * @author MIS
 */
class Cashier_Models_Master_ClusterB extends Cashier_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
      //  $this->embedPrefix = "cluster_";
        $this->embedPrefix = $embedPrefix==NULL?'cluster_':$embedPrefix;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['cluster_id'])){
           $this->setId($x['cluster_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['cluster'])){
           $this->setName($x['cluster']); 
        }
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'cluster_id'=>$this->getId(),
            'code'=>$this->getCode(),
            'cluster'=>$this->getName()
            
        );
        
        return $x;
    }

    

}

?>
