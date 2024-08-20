<?php
ini_set('max_execution_time', 0);
ini_set("memory_limit", "-1");
	function sti_xml_get_columns($data_path, $schema_path)
	{
		return "";
	}
	
	function sti_xml_get_data($data_path, $schema_path)
	{
		$data = file_get_contents($data_path);
		return $data;
	}

?>