This repo is a "how to" consume onprem data in a nodejs instance running in SAP BTP Cloud Foundry Environment.

Summary:
- Setup SAP Cloud Connector instance.
- Create destination in SAP BTP subaccount to the virtual host registered at Cloud Connector.
__________________________________________________________________

- Setup SAP Cloud Connector instance.
1. Download SAP Cloud Connector from https://tools.hana.ondemand.com/
{{img_sap_cc}}

2. Extract the .zip file and open the "go.bat" file.
3. Go to localhost:8443 and login (User: Administrator Password: manage)
4. Click add subaccount and fill the required info
    Region: Region URL in the subaccount overview page
    Subaccount: is the subaccount ID
    Location ID: Any string you want, it'll be used in the Cloud to identify each Cloud Connector linkedin to the subaccount
5. Go to the "Cloud To On-Premise"
6. Click "+" to map a new virtual system.
    Back-end Type: ABAP System
    Protocol: HTTP
    Internal Host: Go to SAP "SICF" tcode. Press F8 to run the program. Click "Information on Port and Host" (the door icon).
    Internal Port: Go to SAP "SICF" tcode. Press F8 to run the program. Click "Information on Port and Host" (the door icon).
    Virtual Host: As you want, this is gonne be the virtual address that will be available to the Cloud.
    Virtual Port: As you want, this is gonne be the virtual address that will be available to the Cloud.
    Princial Type: Kerberos
    Host In Request Header: Use Virtual Host
    Description: can be empty
7. For each virtual system mapped, you'll need to map the resources in the section below. Map all these ("Path and All Sub-Paths"):
    /plugins/pluginrepository	
    /sap/bc/adt	
    /sap/bc/bsp	
    /sap/bc/ui5_ui5	
    /sap/hba	
    /sap/opu/odata
    {{img_sap_cc_resources}}
8. Verify in the subaccount if you can see the Cloud Connector connection.

__________________________________________________________________

- Create destination in SAP BTP subaccount to the virtual host registered at Cloud Connector.
    Name: OnPremDestination (choose the name you want, but pay attention to use the same name inside your project)
    Type: HTTP
    Description: whatever you want
    URL: http://{your-cloudconnector-virtual-host-url}:{your-port}
    Proxy Type: OnPremise
    Authentication: BasicAuthentication
    User: your username
    Password: your password
    Location-ID: the location id you have created in Cloud Connector

    Additional Properties:
    HTML5.DynamicDestination: true
    WebIDEEnabled: true
    WebIDESystem: Gateway
    WebIDEUsage: odata_abap,odata_gen,ui5_execute_abap,dev_abap,bsp_execute_abap,smart_business_odata,smart_business_gen
    sap-client: 210 (this is the sap mandt)
    sap-platform: ABAP
__________________________________________________________________