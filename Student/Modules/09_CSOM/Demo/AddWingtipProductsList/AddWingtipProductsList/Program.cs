using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using SystemIO = System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System.Collections.Specialized;

namespace AddWingtipProductsList {
    class Program {

        static void Main() {

            Console.WriteLine("Adding Team Site Content");
            Console.WriteLine();

            WingtipContentGenerator.CreateProductCategoriesTermset();
            WingtipContentGenerator.CreateProductsLists();

            Console.WriteLine();
            Console.WriteLine("The program has finsihed. Press ENTER to close this window");
            Console.WriteLine();
            Console.ReadLine();



        }

    }
}
