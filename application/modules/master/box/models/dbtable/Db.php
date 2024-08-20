<?php

class Master_Box_Models_Dbtable_Db extends Zend_Db_Table_Abstract {

    protected $_schema = '';
    private $dbError = null;
    protected $_name = 'th_expense';
    private $preparedSql;

    public function __construct($config = array()) {
        $this->_schema = Master_Box_Config::DB_NAME;
   
        return parent::__construct($config);
    }

    private function logError() {
        $file = 'erems_log.txt';
        $file = APPLICATION_PATH . '/../public/app/erems/log/' . $file;
        $current = file_get_contents($file);
        $current .= "[" . date("d-m-Y H:i:s") . "][MSG] " . $this->getErrorMsg() . "\r\n";
        $current .= "[" . date("d-m-Y H:i:s") . "][SQL] " . $this->preparedSql . "\r\n";
        file_put_contents($file, $current);
    }
    
    

    public function SPUpdate($args = '') {
        $row = 0;
        $args = func_get_args();
        $stmt = $this->runSP($this->convertParams($args));
        if ($stmt === NULL) {
            return $row;
        }

        $row = (int) $stmt;
        if ($row == 0) {
          
           $this->logError();
        }

        return $row;
    }

    /*
      public function SPUpdate($args = '') {
      $row = 0;
      $args = func_get_args();
      $stmt = $this->runSP($this->convertParams($args));
      if ($stmt === NULL) {
      return $row;
      }

      $row = (int) $stmt;
      return $row;
      }

     */

    public function SPCreate($args = '') {
        $insertedId = 0;
        $args = func_get_args();
        $stmt = $this->runSP($this->convertParams($args), TRUE);
        if ($stmt) {
            $insertedId = $stmt[0][0]['inserted_id'];
        }
        
        if($insertedId==0){
            $this->logError();
        }
        

        return $insertedId;
    }

    public function SPExecute($args) {
        $args = func_get_args();
        $stmt = (array) $this->runSP($this->convertParams($args), TRUE);

        return $stmt;
    }

    private function convertParams($args) {
        $hasil = '';
        if (is_array($args)) {
            $hasil = array('sp_name' => NULL, 'params' => NULL);
            $spname = ($this->_schema ? $this->_schema . '.' : '') . $args[0];
            $param = '';
            $hasil['sp_name'] = $spname;

            if (count($args) > 1) {

                $args = array_slice($args, 1);

                $param = implode('%$%', $args);
                $param = " '" . str_replace("%$%", "', '", $param) . "' ";
                $hasil['params'] = $param;
            }
        }
        return $hasil;
    }
    
    private function convertParamsToArr($args) {
        $hasil = '';
        if (is_array($args)) {
            $hasil = array('sp_name' => NULL, 'params' => NULL);
            $spname = $args[0];
        
            $hasil['sp_name'] = $spname;

            if (count($args) > 1) {

                $args = array_slice($args, 1);
                $hasil['params'] = $args;
            }
        }
        return $hasil;
    }

    /* @params boolean $execute
     * TRUE => return array 
     * FALSE => return int 1/0
     *  */

    protected function runSP($converParams, $execute = FALSE) {

        if (is_array($converParams)) {

            switch ($this->_adapterName) {
                case 'mysql':
                    $sql = 'CALL ' . $converParams['sp_name'] . ' (' . $converParams['params'] . ')';
                    break;

                case ($this->_adapterName == 'mssql' || $this->_adapterName == 'sqlsrv'):
                    $sql = 'EXEC ' . $converParams['sp_name'] . ' ' . $converParams['params'];
                    break;

                default:
                    return;
                    break;
            }
            $this->preparedSql = $sql;
            $stmt = NULL;
            try {
                $stmt = $this->_db->query($sql);
            } catch (Exception $e) {
                $this->dbError = $e;
            }
            if ($stmt == NULL)
                return 0;

            $result = 0;
            if ($execute) { /* @ RETURN ARRAY */
                $hasil = array();
                try {

                    $hasil[] = $stmt->fetchAll();
                    while ($stmt->nextRowset()) {
                        $hasil[] = $stmt->fetchAll();
                    }
                } catch (Zend_Db_Exception $e) {
                    $this->dbError = 'Zend_Db_Exception: ' . $e->getMessage();
                } catch (Exception $er) {
                    $this->dbError = 'Exception: ' . $e->getMessage();
                }
                $result = $hasil;
            } else { /* @ RETURN INT $rowResult 1/0 */
                try {
                    // get nilai variable @RESULT dari SQL SERVER untuk STATUS CREATE/UPDATE
                    $rowResult = 0;
                    while ($row = $stmt->fetch()) {
                        $hasil = (array) $row;
                    }
                    if (key_exists('result', $hasil)) {
                        $rowResult = (int) $hasil['result'];
                    }
                } catch (Zend_Db_Exception $e) {
                    $this->dbError = 'Zend_Db_Exception: ' . $e->getMessage();
                } catch (Exception $er) {
                    $this->dbError = 'Exception: ' . $e->getMessage();
                }
                $result = $rowResult;
            }
            return $result;
        }
    }
    
    public function query($sql){
        $config = $this->_db->getConfig();
        $config["dbname"] = "erems";
        $this->_db = new Zend_Db_Adapter_Sqlsrv($config);
    
        return $this->_db->query($sql);
    }

    public function spToQuery($args){

        $args = func_get_args();
        $args = $this->convertParamsToArr($args);
        
        $query = $this->spToQueryGenerate($args);

        $stmt = $this->_db->query($query);

        $hasil[] = $stmt->fetchAll();
        while ($stmt->nextRowset()) {
            $hasil[] = $stmt->fetchAll();
        }

        return $hasil;
    }

    public function spToQuery2($args){

        //dengan memakai parameter
        
        $args = func_get_args();
        $args = $this->convertParamsToArr($args);
        
        $query = $this->spToQuery2Generate($args);

        $stmt = $this->_db->query($query);


        $hasil[] = $stmt->fetchAll();
        while ($stmt->nextRowset()) {
            $hasil[] = $stmt->fetchAll();
        }

        return $hasil;
    }
    

    public function spToQueryApi($args){
        
        $args = func_get_args();
        $args = $this->convertParamsToArr($args);
        $query = $this->spToQueryGenerate($args);
        $key = "3bZ2akyb6u9IWA";
        return $this->dbApi($query,$key);

    }

    public function spToQuery2Api($args){

        $args = func_get_args();
        $args = $this->convertParamsToArr($args);
        $query = $this->spToQueryGenerate($args);
        $key = "3bZ2akyb6u9IWA";
        return $this->dbApi($query,$key);

    }

    private function spToQueryGenerate($args){
        
        $spName = $args["sp_name"];
        $paramsQuery = $args["params"];
        
       
        $config = $this->_db->getConfig();
        $config["dbname"] = "erems";
        $this->_db = new Zend_Db_Adapter_Sqlsrv($config);


        $stmt = $this->_db->query(" SELECT definition FROM erems.sys.sql_modules 
                                    WHERE object_id = OBJECT_ID('erems.dbo.".$spName."')
                                      ");
 
          $res = $stmt->fetchAll();
          $res = $res[0]['definition'];
            
          $query = substr($res,  stripos($res, 'BEGIN'));

          $stmt = $this->_db->query("
                select  
                   'Parameter_name' = name, 
                   'Type'   = type_name(user_type_id)  
                   --'Length'   = max_length
                from erems.sys.parameters where object_id = object_id('erems.dbo.".$spName."')
          ");

           $res = $stmt->fetchAll();

           //s: checker & validator
           for ($i=0; $i < sizeof($res) ; $i++) { 
               $qParamname = $res[$i]['Parameter_name'];
               $qType = $res[$i]['Type'];
               $pq = $paramsQuery[$i];
               if($qType=="int" && $pq==""){
                    $paramsQuery[$i]=0;
               }
           }
           //e: checker & validator

           $params  = array();
           $params2 = array();
           foreach ($res as $par) {
                $params[]   = $par['Parameter_name'];
                $params2[]  = "'+".$par['Parameter_name']."+'";
           }

        $query = str_replace($params2, $paramsQuery, $query);
        $query = str_replace($params, $paramsQuery, $query);

        //print_r($query);die();
        return $query;
    }

    private function spToQuery2Generate($args){

        //dengan memakai parameter
        
        $spName = $args["sp_name"];
        $paramsQuery = $args["params"];
       
        $config = $this->_db->getConfig();
        $config["dbname"] = "erems";
        $this->_db = new Zend_Db_Adapter_Sqlsrv($config);


        $stmt = $this->_db->query(" SELECT definition FROM erems.sys.sql_modules 
                                    WHERE object_id = OBJECT_ID('erems.dbo.".$spName."')
                                      ");
 
        $res = $stmt->fetchAll();
        $res = $res[0]['definition'];
            
        $query = substr($res,  stripos($res, 'BEGIN'));

        $stmt = $this->_db->query("
                select  
                   'Parameter_name' = name  , 
                   'Type'   = type_name(user_type_id),  
                   'Length'   = max_length
                from erems.sys.parameters where object_id = object_id('erems.dbo.".$spName."')
        ");

        $res = $stmt->fetchAll();
        $paQue = sizeof($paramsQuery);
        $soRes = sizeof($res);
        $addParam = "";

        if($paQue!==$soRes){
            $diff = abs($paQue-$soRes);
            for($i=0;$i<=$diff;$i++){
                $paramsQuery[]='';
            }
        }

           for($i=0;$i<$soRes;$i++){

               $qParamname = $res[$i]['Parameter_name'];
               $qType = $res[$i]['Type'];
               $qLength = $res[$i]['Length'];

                if($i==0){
                    $addParam = $addParam."DECLARE ";
                }

                if($qType=="varchar"){
                    $addParam = $addParam.$qParamname." ".$qType."(".$qLength.") ";
                }else{
                    $addParam = $addParam.$qParamname." ".$qType." ";
                }

                if($paramsQuery[$i]!==""){ 
                    if($qType=="varchar" || $qType=="date"){
                        $addParam = $addParam." = '".$paramsQuery[$i]."' ";
                    }else{
                        $addParam = $addParam." = ".$paramsQuery[$i]." ";
                    }
                }else{
                    if($qType=="varchar"){
                        $addParam = $addParam." = '' ";
                    }else{
                        $addParam = $addParam." = NULL ";
                    }
                }
                if($soRes-$i !== 1){
                    $addParam = $addParam." , ";
                }
            }



        $query = $addParam.$query;
        $add = ' OPTION (RECOMPILE) '; //reduce query 1/2 time load
        $query = preg_replace("~\W\w+\s*$~", ' ' . $add . '\\0', $query);

        //print_r($query);die();

        return $query;
    }

    private function dbApi($query,$key){

       //external API with meedo

       $baseUrl = "http://" . $_SERVER['SERVER_NAME'];
       
       $curl = curl_init();
       curl_setopt_array($curl, array(
          CURLOPT_URL => $baseUrl."/sqltester/api/meedo/index.php",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"query\"\r\n\r\n".$query."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"key\"\r\n\r\n".$key."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
          CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache",
            "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            "postman-token: 59b0e1d6-9de6-4d6f-6561-5ffd60183e82"
          ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
          echo "cURL Error #:" . $err;
          die();
        } else {
          $hasil = json_decode($response, true);
          return $hasil;
        }
    }
    public function getPreparedSql() {
        return $this->preparedSql;
    }

    public function getDbError() {
        return $this->dbError;
    }

    public function getErrorMsg() {
        $er = $this->dbError;
        $msg = NULL;
        if ($this->dbError === NULL) {
            return $msg;
        }
        if(is_string($er)){
            $msg = $er;
        }else{
            $msg = $er->getMessage();
        }
        
        return $msg;
    }
    
    

    public function printDbError() {
        echo "<pre>";
        var_dump($this->getDbError());
        echo "</pre>";
    }

}

?>