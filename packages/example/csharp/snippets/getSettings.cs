IndexSettings settings = new IndexSettings
{
  CustomRanking = new List<string> { "desc(followers)" }
};

index.SetSettings(setting);

// Asynchronous
await index.SetSettingsAsync(settings);
