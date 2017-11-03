cls
Add-PSSnapin Microsoft.SharePoint.Powershell

$searchServiceApplicationName = "Search Service Application"
$searchServiceApplication = Get-SPEnterpriseSearchServiceApplication $searchServiceApplicationName 

$sharepointPropSet = "00130329-0000-0130-c000-000000131346"


# ProductCode
New-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $searchServiceApplication -Category SharePoint -IsNameEnum $false -Name "ows_ProductCode" -PropSet $sharepointPropSet -VariantType 0
New-SPEnterpriseSearchMetadataManagedProperty -Name "ProductCode" -SearchApplication "Search Service Application" -Type 1 -FullTextQueriable $true -Queryable $true -Retrievable $true
$cpProductCode = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication "Search Service Application" -Name "ows_ProductCode"   
$mpProductCode = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication "Search Service Application" -Identity "ProductCode"
New-SPEnterpriseSearchMetadataMapping -SearchApplication "Search Service Application" -CrawledProperty $cpProductCode -ManagedProperty $mpProductCode

# ProductDescription
New-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $searchServiceApplication -Category SharePoint -IsNameEnum $false -Name "ows_ProductDescription" -PropSet $sharepointPropSet -VariantType 0
New-SPEnterpriseSearchMetadataManagedProperty -Name "ProductDescription" -SearchApplication "Search Service Application" -Type 1 -FullTextQueriable $true -Queryable $false -Retrievable $true
$cpProductDescription = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication "Search Service Application" -Name "ows_ProductDescription"   
$mpProductDescription = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication "Search Service Application" -Identity "ProductDescription"
New-SPEnterpriseSearchMetadataMapping -SearchApplication "Search Service Application" -CrawledProperty $cpProductDescription -ManagedProperty $mpProductDescription

# ProductListPrice
New-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $searchServiceApplication -Category SharePoint -IsNameEnum $false -Name "ows_ProductListPrice" -PropSet $sharepointPropSet -VariantType 0
New-SPEnterpriseSearchMetadataManagedProperty -Name "ProductListPrice" -SearchApplication "Search Service Application" -Type 3 -FullTextQueriable $false -Queryable $false -Retrievable $true
$cpProductListPrice = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication "Search Service Application" -Name "ows_ProductListPrice"
$mpProductListPrice = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication "Search Service Application" -Identity "ProductListPrice"
$mpProductListPrice.Refinable = $true
$mpProductListPrice.Sortable = $true
$mpProductListPrice.Update()
New-SPEnterpriseSearchMetadataMapping -SearchApplication "Search Service Application" -CrawledProperty $cpProductListPrice -ManagedProperty $mpProductListPrice

# ProductColor
New-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $searchServiceApplication -Category SharePoint -IsNameEnum $false -Name "ows_ProductColor" -PropSet $sharepointPropSet -VariantType 0
New-SPEnterpriseSearchMetadataManagedProperty -Name "ProductColor" -SearchApplication "Search Service Application" -Type 1 -FullTextQueriable $true -Queryable $false -Retrievable $true
$cpProductColor = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication "Search Service Application" -Name "ows_ProductColor"   
$mpProductColor = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication "Search Service Application" -Identity "ProductColor"
$mpProductColor.HasMultipleValues = $true
$mpProductColor.Refinable = $true
$mpProductColor.Update()
New-SPEnterpriseSearchMetadataMapping -SearchApplication "Search Service Application" -CrawledProperty $cpProductColor -ManagedProperty $mpProductColor

# ProductImageUrl
New-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication $searchServiceApplication -Category SharePoint -IsNameEnum $false -Name "ows_ProductImageUrl" -PropSet $sharepointPropSet -VariantType 0
New-SPEnterpriseSearchMetadataManagedProperty -Name "ProductImageUrl" -SearchApplication "Search Service Application" -Type 1 -FullTextQueriable $false -Queryable $false -Retrievable $true
$cpProductImageUrl = Get-SPEnterpriseSearchMetadataCrawledProperty -SearchApplication "Search Service Application" -Name "ows_ProductImageUrl"   
$mpProductImageUrl = Get-SPEnterpriseSearchMetadataManagedProperty -SearchApplication "Search Service Application" -Identity "ProductImageUrl"
New-SPEnterpriseSearchMetadataMapping -SearchApplication "Search Service Application" -CrawledProperty $cpProductImageUrl -ManagedProperty $mpProductImageUrl

