using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Globalization;

namespace Shakespeare
{
    class Program
    {
        public static Dictionary<string, List<string>> Dictionary;

        static void Main(string[] args)
        {
            Console.WriteLine("Generating dictionary...");

            Dictionary = GenerateDictionaryFromFile("C:\\users\\zsadler\\Desktop\\insults.txt");

            Console.WriteLine("Done!\n\n");

            while (true)
            {
                Console.WriteLine(GenerateWords(100) + "\n\n");
                Console.ReadLine();
            }
        }

        public static string GenerateWords(int NumberOfWords)
        {
            StringBuilder Answer = new StringBuilder();

            string curr;
            Random rng = new Random((int)DateTime.Now.Ticks);
            int currIndex;
            int secondIndex;

            TextInfo ti = new CultureInfo("en-us", false).TextInfo;

            // start at a random word
            currIndex = rng.Next() % Dictionary.Count();
            curr = Dictionary.Keys.ToList()[currIndex];
            Answer.Append(ti.ToTitleCase(curr));

            bool ToTitle = false;

            // then use that as the seed for the next word
            for (int i = 0; i < NumberOfWords; i++)
            {
                ToTitle = false;
                while (string.IsNullOrWhiteSpace(curr) || Dictionary[curr].Count() <= 0)
                {
                    currIndex = rng.Next() % Dictionary.Count();
                    curr = Dictionary.Keys.ToList()[currIndex];
                }

                currIndex = rng.Next() % Dictionary[curr].Count();

                if (curr.Contains(".") || curr.Contains("?") || curr.Contains("!"))
                    ToTitle = true;

                curr = Dictionary[curr][currIndex];

                if (ToTitle || curr.Equals("i"))
                    Answer.Append(" " + ti.ToTitleCase(curr));
                else
                    Answer.Append(" " + curr);
            }

            return Answer.ToString();
        }

        public static Dictionary<string, List<string>> GenerateDictionaryFromFile(string FilePath)
        {
            string [] SplitOnWhitespace = File.ReadAllText(FilePath).ToLowerInvariant().Split(null);
            Dictionary<string, List<string>> Answer = new Dictionary<string,List<string>>();

            for (int i = 0; i < SplitOnWhitespace.Length - 1; i++)
            {
                string Word = SplitOnWhitespace[i];

                if (!Answer.ContainsKey(Word))
                    Answer.Add(Word, new List<string>());
                if (!string.IsNullOrWhiteSpace(SplitOnWhitespace[i + 1]))
                    Answer[Word].Add(SplitOnWhitespace[i + 1]);
            }

            return Answer;
        }
    }
}
