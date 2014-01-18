$(document).ready(function(){
	
	$('#trash').droppable({
		accept: '.items',
		hoverClass: "ui-state-hover",
		drop: function(e, ui){
			ui.draggable.remove();
		}		
	});

    $('#removeSelected').click(function(){
        if($('.items input').is(':checked')){
            $('.items input:checked').closest('ul').remove();
        }
    });
    
	$('#sorting input').click(function(){
		$(this).prop('check',true);
	});
	
	$('#addToList').submit(function(e){
	    e.preventDefault();
	    
	    var listName = $('#textBox').val();
	    
		if(listName != ''){
			
			AddListItem(listName,e);
			
			$('.items').draggable({
				revert: true
			});
		}
		else{
			alert("Please enter shopping list item value");
		}
		
		$('#textBox').val('');
		
		return false;
	});
	
	$("#itemList").delegate('.name', // The child element to bind to
                               'dblclick', // The event we want to bind
                               function() { // The handler
                   
            var itemName;   
            
            if($(this).text() != '' || $(this).text() != null){
                itemName = $(this).text();
            }
            
            //erase previously inputted name for list
            $(this).text('');
            
            //target the next element whichis the hidden text input box show and change its margin
            $(this).next().show();
            $(this).next().find('.itemEditBox').attr('placeholder', itemName);
            $(this).next().find('.itemEditBox').val('');
            $(this).next().css({'margin-left':'-30px'});
            
            //on keypress = 'enter', the previous node (class='name') becomes the input value and hide text input felement
            $(this).next().keypress(function(e){
                if(e.which == 13){
                    
                    itemName = $(this).find('.itemEditBox').val();
                    
                    if(itemName != ''){
                        $(this).prev().text(itemName);
                        $(this).hide();
                    }
                    else{
                        alert("Please enter shopping list item value");
                    }
                }
            });
            
            //when input field is not in focus, the previous node (class='name') becomes the input value and hide text input felement
            $(this).next().find('.itemEditBox').blur(function(){
                $(this).parent().prev().text(itemName);
                $(this).parent().hide();
            });
        });
        
   $('#sortButton').click(function(){
        
        var sortOrder = $('#sortOrder option:selected').text();
        
        if($('#alpha').prop('checked')){
            SortByAlpha(sortOrder);
        }
        else if($('#priority').prop('checked')){
            SortByPriority(sortOrder);
        }
        else if($('#timeCreated').prop('checked')){
            SortByTime(sortOrder);
        }
        else{
            alert("No criteria button was cheked");
        }
    });
});
	
	function AddListItem(listName, e){
		
		var isPriority;
		var itemName = listName;
		var date = GetDate(e);
        var options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
		
		
		if($('#prioritySelect').val() != null){
			isPriority = $('#prioritySelect').val();
		}
		
		$('#itemList').append('<ul class="items">'+
    							    '<li><input type="checkbox"></li>'+
    							    '<li class="name">'+ itemName + '</li>'+
    							    '<li style="display:none;"><input class="itemEditBox"></input></li>'+
    							    '<li class="priority">Priority: '+ isPriority + '</li>'+
    							    '<li class="dateCreated">Created: '+ date.toLocaleTimeString("en-us", options) +'</li>'+
    							    '</ul>');
	}
	
	function GetDate(e){
	    var date = new Date(e.timeStamp);
        
        return date;
	}
	
	function SortByAlpha(ordering){
		
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[1].innerHTML.toLowerCase() > $(b).context.children[1].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){;
	    		return $(a).context.children[1].innerHTML.toLowerCase() < $(b).context.children[1].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
	function SortByPriority(ordering){
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[3].innerHTML.toLowerCase() > $(b).context.children[3].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[3].innerHTML.toLowerCase() < $(b).context.children[3].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
	function SortByTime(ordering){
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[4].innerHTML.toLowerCase() > $(b).context.children[4].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[4].innerHTML.toLowerCase() < $(b).context.children[4].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
