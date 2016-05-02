using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CsomLookupColumnDemo {
  class Program {

    static void Main() {

      string url = "https://intranet.wingtip.com";
      ClientContext clientContext = new ClientContext(url);

      Web site = clientContext.Web;
      clientContext.ExecuteQuery();

      CleanUp(clientContext);
   
      Console.WriteLine("Creating Teams list");
      ListCreationInformation ciTeams = new ListCreationInformation();
      ciTeams.Title = "Teams";
      ciTeams.Url = "Lists/Teams";
      ciTeams.QuickLaunchOption = QuickLaunchOptions.On;
      ciTeams.TemplateType = (int)ListTemplateType.GenericList;

      List Teams = site.Lists.Add(ciTeams);
      Teams.EnableAttachments = false;
      Teams.Fields.GetByInternalNameOrTitle("Title").Title = "Team";
      Teams.Fields.GetByInternalNameOrTitle("Title").Update();
      Teams.Update();

      ListItem team1 = Teams.AddItem(new ListItemCreationInformation());
      team1["Title"] = "Boston Celtics";
      team1.Update();

      ListItem team2 = Teams.AddItem(new ListItemCreationInformation());
      team2["Title"] = "Los Angeles Lakers";
      team2.Update();

      clientContext.Load(Teams);
      clientContext.ExecuteQuery();

      Console.WriteLine("Creating Players list");
      ListCreationInformation ciPlayers = new ListCreationInformation();
      ciPlayers.Title = "Players";
      ciPlayers.Url = "Lists/Players";
      ciPlayers.QuickLaunchOption = QuickLaunchOptions.On;
      ciPlayers.TemplateType = (int)ListTemplateType.GenericList;

      List Players = site.Lists.Add(ciPlayers);
      Players.Fields.GetByInternalNameOrTitle("Title").Title = "Player";
      Players.Fields.GetByInternalNameOrTitle("Title").Update();
      Players.EnableAttachments = false;
      Players.Update();

      Console.WriteLine("Adding lookup column");

      string fieldXML = @"<Field Name='Team' " +
                                "DisplayName='Team' " +
                                "Type='Lookup' > " +
                         "</Field>";

      FieldLookup lookup = clientContext.CastTo<FieldLookup>(Players.Fields.AddFieldAsXml(fieldXML, true, AddFieldOptions.DefaultValue));
      lookup.LookupField = "Title";
      lookup.LookupList = Teams.Id.ToString();
      // set lookup column as indexed
      lookup.Indexed = true;
      // set relationship behavior on lookup items to cascade delete
      lookup.RelationshipDeleteBehavior = RelationshipDeleteBehaviorType.Cascade;
      lookup.Update();
      

      clientContext.ExecuteQuery();

      ListItem player1 = Players.AddItem(new ListItemCreationInformation());
      player1["Title"] = "Larry Bird";
      player1["Team"] = 1;
      player1.Update();

      ListItem player2 = Players.AddItem(new ListItemCreationInformation());
      player2["Title"] = "Dennis Johnson";
      player2["Team"] = 1;
      player2.Update();

      ListItem player3 = Players.AddItem(new ListItemCreationInformation());
      player3["Title"] = "Kevin McCale";
      player3["Team"] = 1;
      player3.Update();

      ListItem player4 = Players.AddItem(new ListItemCreationInformation());
      player4["Title"] = "Robert Parrish";
      player4["Team"] = 1;
      player4.Update();

      ListItem player5 = Players.AddItem(new ListItemCreationInformation());
      player5["Title"] = "Danny Ainge";
      player5["Team"] = 1;
      player5.Update();

      ListItem player6 = Players.AddItem(new ListItemCreationInformation());
      player6["Title"] = "Magic Johnson";
      player6["Team"] = 2;
      player6.Update();

      ListItem player7 = Players.AddItem(new ListItemCreationInformation());
      player7["Title"] = "James Worthy";
      player7["Team"] = 2;
      player7.Update();

      ListItem player8 = Players.AddItem(new ListItemCreationInformation());
      player8["Title"] = "Michael Cooper";
      player8["Team"] = 2;
      player8.Update();

      ListItem player9 = Players.AddItem(new ListItemCreationInformation());
      player9["Title"] = "Byron Scott";
      player9["Team"] = 2;
      player9.Update();
    
      ListItem player10 = Players.AddItem(new ListItemCreationInformation());
      player10["Title"] = "Kurt Rambis";
      player10["Team"] = 2;
      player10.Update();

      clientContext.ExecuteQuery();

      Console.WriteLine("All done");

    }

    static void CleanUp(ClientContext clientContext) {

      Web site = clientContext.Web;

      ExceptionHandlingScope scope1 = new ExceptionHandlingScope(clientContext);
      using (scope1.StartScope()) {
        using (scope1.StartTry()) {
          Field fldTeam = site.Lists.GetByTitle("Players").Fields.GetByInternalNameOrTitle("Team");
          FieldLookup fldLookupTeam = clientContext.CastTo<FieldLookup>(fldTeam);
          fldLookupTeam.RelationshipDeleteBehavior = RelationshipDeleteBehaviorType.None;
          fldLookupTeam.Update();
        }
        using (scope1.StartCatch()) { }
      }

      ExceptionHandlingScope scope2 = new ExceptionHandlingScope(clientContext);
      using (scope2.StartScope()) {
        using (scope2.StartTry()) {
          site.Lists.GetByTitle("Players").DeleteObject();
        }
        using (scope2.StartCatch()) { }
      }

      ExceptionHandlingScope scope3 = new ExceptionHandlingScope(clientContext);
      using (scope3.StartScope()) {
        using (scope3.StartTry()) {
          site.Lists.GetByTitle("Teams").DeleteObject();
        }
        using (scope3.StartCatch()) { }
      }

    }
  }
}
