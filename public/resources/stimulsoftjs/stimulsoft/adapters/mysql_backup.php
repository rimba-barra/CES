<?php
class StiMsSqlAdapter {
	private $connectionString = null;
	private $connectionInfo = null;
	private $link = null;
	private $isMicrosoftDriver = false;
	
	private function getLastErrorResult() {
		$error = null;
		if ($this->isMicrosoftDriver) {
			if (($errors = sqlsrv_errors()) != null) {
				$error = $errors[count($errors) - 1];
				return StiResult::error("[".$error['code']."] ".$error['message']);
			}
		}
		else $error = mssql_get_last_message();
		
		if ($error) return StiResult::error($error);
		return StiResult::error("Unknown");
	}
	
	private function connect() {
		if ($this->isMicrosoftDriver) {
			$this->link = sqlsrv_connect(
					$this->connectionInfo->host, 
					array(
						"UID" => $this->connectionInfo->userId,
						"PWD" => $this->connectionInfo->password,
						"Database" => $this->connectionInfo->database,
						"LoginTimeout" => 10,
						"ReturnDatesAsStrings" => true,
						"CharacterSet" => $this->connectionInfo->charset
					));
			if (!$this->link) return $this->getLastErrorResult();
		}
		else {
			$this->link = mssql_connect($this->connectionInfo->host, $this->connectionInfo->userId, $this->connectionInfo->password);
			if (!$this->link) return $this->getLastErrorResult();
			$db = mssql_select_db($this->connectionInfo->database, $this->link);
			mssql_close($this->link);
			if (!$db) return $this->getLastErrorResult();
		}
		
		return StiResult::success();
	}
	
	private function disconnect() {
		if (!$this->link) return;
		$this->isMicrosoftDriver ? sqlsrv_close($this->link) : mssql_close($this->link);
	}
	
	public function parse($connectionString) {
		$info = new stdClass();
		$info->host = "";
		$info->database = "";
		$info->userId = "";
		$info->password = "";
		$info->charset = "UTF-8";
		session_start();
                if (!isset($_SESSION['Ciputra'], $_SERVER['HTTP_REFERER'])) {
                    session_destroy();
                    header('location: ../index.php');
                    exit;
                }
		
		$parameters = explode(";", $connectionString);
		foreach($parameters as $parameter)
		{
			if (strpos($parameter, "=") < 1) continue;
		
			$spos = strpos($parameter, "=");
			$name = strtolower(trim(substr($parameter, 0, $spos)));
			$value = trim(substr($parameter, $spos + 1));
			
			switch ($name)
			{
				case "server":
				case "data source":
					//$info->host = $value;
					$info->host = getenv('COMPUTERNAME')."\SQLEXPRESS";
					break;
						
				case "database":
				case "initial catalog":
					$info->database = $_SESSION['Ciputra'][$_SESSION['Ciputra']['common']['btab_sessid']]['modulebase'];
					//$info->database = "gl_2016";
					break;
						
				case "uid":
				case "user":
				case "user id":
					$info->userId = "sa";
					break;
						
				case "pwd":
				case "password":
					$info->password = "123";
					break;
					
				case "charset":
					$info->charset = "UTF-8";
					break;
			}
		}
		
		$this->connectionString = $connectionString;
		$this->connectionInfo = $info;
	}
	
	public function test() {
		$result = $this->connect();
		if ($result->success) $this->disconnect();
		return $result;
	}
	
	public function execute($queryString) {
		$result = $this->connect();
		if ($result->success) {
			$query = $this->isMicrosoftDriver ? sqlsrv_query($this->link, $queryString) : mssql_query($queryString, $this->link);
			if (!$query) return $this->getLastErrorResult();
			
			$result->columns = array();
			$result->rows = array();
			while ($rowItem = $this->isMicrosoftDriver ? sqlsrv_fetch_array($query, SQLSRV_FETCH_ASSOC) : mssql_fetch_assoc($query)) {
				$row = array();
				foreach ($rowItem as $key => $value) {
					if (count($result->columns) < count($rowItem)) $result->columns[] = $key;
					$row[] = $value;
				}
				$result->rows[] = $row;
			}
			$this->disconnect();
		}
	
		return $result;
	}
	
	function __construct() {
		$this->isMicrosoftDriver = !function_exists("mssql_connect");
	}
}