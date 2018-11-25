var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyCmexHyv4f7A9kRdz0a_KEKuFHCIDDFXYk",
    authDomain: "newagent-544b5.firebaseapp.com",
    databaseURL: "https://newagent-544b5.firebaseio.com",
    projectId: "newagent-544b5",
    storageBucket: "newagent-544b5.appspot.com",
    messagingSenderId: "693588300138"
};

exports.hello = function(){
  return "Hello";
}


firebase.initializeApp(config);
var database = firebase.database();
//var dataStore = firebase.storage();
//var managerID=getManagerID("Cbbb","c3");

//addCustomer("Xristos","RLSB101010");
//removeCustomer("Cddd");
//removeManager("Mbbb")
//addManager("Mccc","RLSB101010");
//addAccount("Xristos","Mccc","c6");
getRailsBankFromID("Vasilis");

isCustomer("5bf956f7-909e-4f6a-bfe0-bd2a7b4dc262",function() {
  console.log("true");
}, function() {
  console.log("false");
});

/*var dbRef=database.ref('Customers/kqwheqiwejqiwejq/');


    var countRef=dbRef.once('value').then(function(snapshot){
        console.log(snapshot.val());
    });
var dbRef=database.ref('Customers/');


    var countRef=dbRef.once('value').then(function(snapshot){
        console.log(snapshot.val()["kqwheqiwejqiwejq"]["managers"]["<accountID>"]);
    });*/

function addTransaction(customerID,date,amount,description,receiptImage){
    var file = Blob()

    }

function addAccount(customerID, managerID, accountID){
    var allCustomersRef = database.ref('Customers/')
    allCustomersRef.once('value').then(function(snapshot){
        var allCustomers = snapshot.val()
        var index = getCustomerDBID(allCustomers, customerID)



        var allCustomersRef = database.ref('Customers/')
        allCustomersRef.once('value').then(function(snapshot){
            var newInd=Object.keys(snapshot.val()).length-1;
            database.ref('Customers/'+index+'/Accounts/'+newInd).set({
                ID: accountID
            });
        });

        //var newIndex = database.ref('Customers/'+index+'Accounts/').push().key;


    });

    var allManagersRef = database.ref('Managers/')
    allManagersRef.once('value').then(function(snapshot){

        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==managerID)
            {

                var manager = allManagers[i]
                if(manager['Accounts']==null)
                {
                    database.ref('Managers/'+i+'/Accounts/0').set({
                        ID: accountID
                    });
                }
                else
                {
                    var accounts = manager['Accounts']
                    var accountsCount = Object.keys(accounts).length

                    for(var j=0;j<accountsCount;j++)
                    {
                        if(accounts[j]['ID']==accountID){
                            return
                        }
                    }

                    var newInd=accountsCount-1;
                    database.ref('Managers/'+i+'/Accounts/'+newInd).set({
                        ID: accountID
                    });
                }


            }
        }
        //        var newInd=Object.keys(snapshot.val()).length-1;
        //        database.ref('Customers/'+index+'/Accounts/'+newInd).set({
        //            ID: accountID
        //        });
    });
}

function getCustomerDBID(allCustomers,customerID){
    for(var i=0;i<Object.keys(allCustomers).length;i++)
    {
        if(allCustomers[i]['ID']==customerID)
        {
            return i;
        }
    }
}

function isCustomer(entityID,onSuccess,onFailure){
    var allManagersRef = database.ref('Managers/');
    allManagersRef.once('value').then(function(snapshot){
      var allManagers = snapshot.val();
      for(var i=0;i<Object.keys(allManagers).length;i++)
      {
        // console.log(allManagers[i]);
        if(allManagers[i]['ID']==entityID)
        {
          onFailure()
          // console.log("in");
            return false;
        }
      }
      onSuccess()
      // console.log("out");
      return true;
    })
}


function getRailsBankFromID(ID){

    var allManagersRef = database.ref('Managers/')
    allManagersRef.once('value').then(function(snapshot){

        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==ID)
            {
                console.log(allManagers[i]['RailsBankID']);
                return allManagers[i]['RailsBankID'];
            }
        }
    });


    var allCustomersRef = database.ref('Customers/')
    allCustomersRef.once('value').then(function(snapshot){

        var allCustomers = snapshot.val()
        for(var i=0;i<Object.keys(allCustomers).length;i++)
        {
            if(allCustomers[i]['ID']==ID)
            {
                return allCustomers[i]['RailsBankID'];
            }
        }
    });
}


function addCustomer(customerID,RailsBankID)
{
    var allCustomersRef = database.ref('Customers/')

    allCustomersRef.once('value').then(function(snapshot){
        var customerCount=Object.keys(snapshot.val()).length

        database.ref('Customers/'+customerCount).set({
            ID: customerID,
            RailsBankID: RailsBankID
        });
    });
}

function removeCustomer(customerID)
{
    var allCustomersRef = database.ref('Customers/')

    allCustomersRef.once('value').then(function(snapshot){
        var allCustomers = snapshot.val()
        for(var i=0;i<Object.keys(allCustomers).length;i++)
        {
            if(allCustomers[i]['ID']==customerID)
            {
                database.ref('Customers/'+i).remove();
            }
        }
    });

}

function addManager(managerID,RailsBankID)
{
    var allManagersRef = database.ref('Managers/')

    allManagersRef.once('value').then(function(snapshot){
        var managerCount=Object.keys(snapshot.val()).length

        database.ref('Managers/'+managerCount).set({
            ID: managerID,
            RailsBankID: RailsBankID
        });
    });
}

function removeManager(managerID)
{
    var allManagersRef = database.ref('Managers/')

    allManagersRef.once('value').then(function(snapshot){
        var allManagers = snapshot.val()
        for(var i=0;i<Object.keys(allManagers).length;i++)
        {
            if(allManagers[i]['ID']==managerID)
            {
                database.ref('Managers/'+i).remove();
            }
        }
    });

}


function getManagerID(customerID,accountID)
{

    var dbRef=database.ref('Managers/');


    var countRef=dbRef.once('value').then(function(snapshot){
        var managerID=getManager(snapshot.val(),accountID);
        //var customerObject=getCustomer(snapshot.val(),customerID);
        //var arrayOfaccountIDs=getAccounts(customerObject);
        //console.log(arrayOfaccountIDs);
        console.log(managerID);
        return managerID;
    });

}

function getAccounts(user)
{
    var accountID = new Array();
    for(var j=0;j<Object.keys(user['Accounts']).length;j++)
    {
        accountID.push(user['Accounts'][j]['ID']);
    }
    return accountID;
}

function getCustomer(allCustomers,customerID)
{

    for(var i=0;i<Object.keys(allCustomers).length;i++)
    {
        console.log(allCustomers[i]['ID']);
        if(allCustomers[i]['ID']==customerID)
        {
            return allCustomers[i];
        }
        //var arrayOfaccountIDs=getAccounts(allCustomers[i]);
        //console.log(arrayOfaccountIDs);
    }
}

function getManager(allManagers,accountID)
{

    for(var i=0;i<Object.keys(allManagers).length;i++)
    {
        //console.log(allManagers[i]);
        //console.log(i);

        for(var j=0;j<Object.keys(allManagers[i]['Accounts']).length;j++)
        {
            //console.log(allManagers[i]['Accounts'][j]['ID']);
            //console.log(j);
            if(allManagers[i]['Accounts'][j]['ID']==accountID)
            {
                return allManagers[i]['ID'];
            }
        }
    }
}







/*var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAOY-PIOLx5ITkdKXWZFUMfvK9Nf7gVCeI",
    authDomain: "pointbank-a778f.firebaseapp.com",
    databaseURL: "https://pointbank-a778f.firebaseio.com",
    projectId: "pointbank-a778f",
    storageBucket: "pointbank-a778f.appspot.com",
    messagingSenderId: "69974187061"
};

    firebase.initializeApp(config);




function start()
{
    document.getElementById('demo').innerHTML = "Page is loaded";

    document.getElementById('demo').innerHTML = "Config done";
}

function date()
{
    document.getElementById('demo').innerHTML = Date();
    var dbRef=database.ref('Customers/Customer1/customerid');


    var countRef=dbRef.once('value').then(function(snapshot)
                                                                          {
        document.getElementById('demo').innerHTML = snapshot.val();
    });
}



function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}*/
