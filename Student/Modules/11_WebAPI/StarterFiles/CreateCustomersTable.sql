
CREATE TABLE [dbo].[Customers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Company] [nvarchar](100) NULL,
	[WorkPhone] [nvarchar](100) NULL,
	[HomePhone] [nvarchar](100) NULL,
	[EmailAddress] [nvarchar](100) NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED ([ID] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]) ON [PRIMARY]

GO


INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Quincy', 'Nelson', 'Benthic Petroleum', '1(340)608-7748', '1(340)517-3737', 'Quincy.Nelson@BenthicPetroleum.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Jude', 'Mason', 'Cyberdyne Systems', '1(203)408-0466', '1(203)411-0071', 'Jude.Mason@CyberdyneSystems.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Sid', 'Stout', 'Roxxon', '1(518)258-6571', '1(518)376-8576', 'Sid.Stout@Roxxon.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Gilberto', 'Gillespie', 'Shinra Electric Power Company', '1(270)510-1720', '1(270)755-7810', 'Gilberto.Gillespie@ShinraElectricPowerCompany.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Diane', 'Strickland', 'Izon', '1(407)413-4851', '1(407)523-5411', 'Diane.Strickland@Izon.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Jacqueline', 'Zimmerman', 'Zorg Industries', '1(844)234-0550', '1(844)764-3522', 'Jacqueline.Zimmerman@ZorgIndustries.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Naomi', 'Schroeder', 'ComTron', '1(204)355-6648', '1(204)356-2831', 'Naomi.Schroeder@ComTron.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Lynne', 'Stephens', 'Trade Federation', '1(407)787-7308', '1(407)732-1700', 'Lynne.Stephens@TradeFederation.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Luther', 'Sullivan', 'Metacortex', '1(323)755-3404', '1(323)684-7814', 'Luther.Sullivan@Metacortex.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Rose', 'Parsons', 'Hanso Foundation', '1(802)357-5583', '1(802)727-0246', 'Rose.Parsons@HansoFoundation.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Bridgette', 'Meadows', 'Brown Streak Railroad', '1(250)468-4824', '1(250)403-3653', 'Bridgette.Meadows@BrownStreakRailroad.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Merle', 'Black', 'Volée Airlines', '1(248)240-1267', '1(248)221-0302', 'Merle.Black@VoléeAirlines.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Berta', 'Wilkinson', 'Doublemeat Palace', '1(270)830-5347', '1(270)338-3401', 'Berta.Wilkinson@DoublemeatPalace.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Brandi', 'Bates', 'Duff Beer', '1(808)660-1110', '1(808)833-4310', 'Brandi.Bates@DuffBeer.com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Ana', 'Mathews', 'WarioWare, Inc.', '1(844)663-5428', '1(844)782-2117', 'Ana.Mathews@WarioWare,Inc..com') 
INSERT INTO Customers (FirstName, LastName, Company, WorkPhone, HomePhone, EmailAddress) Values('Chet', 'Lawson', 'The Crab Shack', '1(340)843-4478', '1(340)523-1010', 'Chet.Lawson@TheCrabShack.com') 

GO
