"'use client'";

import { useState, useEffect } from "react";
import { quotes } from "../data/quotes";
import { Loader2, RefreshCw, Quote } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InteractiveBlogLoader() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fact, setFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000); // Change quote every 10 seconds

    return () => {
      clearInterval(quoteInterval);
    };
  }, []);

  const fetchRandomFact = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "'https://uselessfacts.jsph.pl/random.json?language=en'"
      );
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error("'Error fetching random fact:'", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-50">
            Generating Your Blog
          </CardTitle>
          <CardDescription className="text-center">
            Please wait while we craft your amazing blog post...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-16 w-16 text-neutral-900 dark:text-neutral-50" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Quote className="mr-2" />
                Quote of the Moment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="italic text-neutral-500 dark:text-neutral-400">
                "{currentQuote.text}"
              </blockquote>
            </CardContent>
            <CardFooter className="text-sm text-neutral-500 dark:text-neutral-400">
              - {currentQuote.author}
            </CardFooter>
          </Card>

          <div className="text-center">
            <Button
              onClick={fetchRandomFact}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Get a Random Fact
            </Button>
          </div>

          {fact && (
            <Card>
              <CardHeader>
                <CardTitle>Did you know?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-500 dark:text-neutral-400">{fact}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
