//三级联动
	function locat(){
		var str="<select id='sheng'></select><select id='shi'></select><select id='qu'></select>";  //先写三个下拉列表放到div里面
		$("#sanji").html(str);
		fullsheng();
		fullshi();
		fullqu();
		$("#sheng").change(function(){
			fullshi();
			fullqu();
		});
		$("#shi").change(function(){
			fullqu();
		});
		//加载省份信息
		function fullsheng(){
		    var pcode="0";//根据父级代号查数据
		    $.ajax({
		      async:false, //采用异步的方式
		      url:apiurl+"api/area/findarea",
		      data:{area_id:pcode},
		      type:"POST",
		      dataType:"JSON",
		      success:function(data){
		        //这里传过来的data是个数组
		        str="";
		        for(var j in data.data)//js中的遍历数组用for来表示
		        {
		          str +="<option value='"+data.data[j].area_id+"'>"+data.data[j].area_name+"</option>";
		        }
		        $("#sheng").html(str);
		      }
		    });
		};
		//加载市的信息
		function fullshi(){
		    var pcode=$("#sheng").val();
		    $.ajax({
		      async:false,
		      url:apiurl+"api/area/findarea",
		      data:{area_id:pcode},
		      type:"POST",
		      dataType:"JSON",
		      success:function(data){
		        //这里传过来的data是个数组
		        str="";
		        for(var j in data.data)//js中的遍历数组用for来表示
		        {
		          str +="<option value='"+data.data[j].area_id+"'>"+data.data[j].area_name+"</option>";
		        }
		        $("#shi").html(str);
		      }
		    });
		};
		// 加载区的信息
		function fullqu(){
		    var pcode=$("#shi").val();
		    $.ajax({
		      url:apiurl+"api/area/findarea",
		      data:{area_id:pcode},
		      type:"POST",
		      dataType:"JSON",
		      success:function(data){
		        //这里传过来的data是个数组
		        str="";
		        for(var j in data.data)//js中的遍历数组用for来表示
		        {
		          str +="<option value='"+data.data[j].area_id+"'>"+data.data[j].area_name+"</option>";
		        }
		        $("#qu").html(str);
		      }
		    });
		};
	}
	locat();